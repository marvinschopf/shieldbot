#!/usr/bin/env node
require('coffee-script/register');
const Discord = require('discord.js');
const fs      = require('fs')
const { CmdParser } = require('./cmdparser.js')
const Eris = require('eris');
const colors = require('colors')
const aload = require('after-load');
const funcs = require("./funcs.coffee");
const cmds = require('./cmds.coffee');
const chatflag = require('./chatflag.js');
const events = require('./events.coffee');

var VERSION = "0.1 Build ";
// Extending version with number of commits from github master branch
VERSION += parseInt(aload.$(aload("https://github.com/MagicMarvMan/shieldbot"))('li[class="commits"]').text());

const Color = {
    red:    0xe50202,
    green:  0x51e502,
    cyan:   0x02e5dd,
    blue:   0x025de5,
    violet: 0x9502e5,
    pink:   0xe502b4,
    gold:   0xe5da02,
    orange: 0xe54602
}

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

const bot = new Eris.CommandClient(config.token, {}, {
  description: config.description,
  owner: config.owner,
  prefix: config.prefix
});

funcs.setBot(bot);
cmds.setBot(bot);
events.setBot(bot);
cmds.setVersion(VERSION);
chatflag.setBot(bot);

/*
  ≤=======≥
  main
  ≤=======≥
*/

bot.on("ready", () => {
  funcs.setStatus("NodeJS");
});

var playCommand = "/play";
bot.on("messageCreate", (msg) => { // When a message is created
    if(msg.content.startsWith(playCommand)) { // If the message content starts with "!play "
        if(msg.content.length <= playCommand.length + 1) { // Check if a filename was specified
            bot.createMessage(msg.channel.id, "Please specify a filename.");
            return;
        }
        if(!msg.channel.guild) { // Check if the message was sent in a guild
            bot.createMessage(msg.channel.id, "This command can only be run in a server.");
            return;
        }
        if(!msg.member.voiceState.channelID) { // Check if the user is in a voice channel
            bot.createMessage(msg.channel.id, "You are not in a voice channel.");
            return;
        }
        var filename = msg.content.substring(playCommand.length + 1); // Get the filename
        bot.joinVoiceChannel(msg.member.voiceState.channelID).catch((err) => { // Join the user's voice channel
            bot.createMessage(msg.channel.id, "Error joining voice channel: " + err.message); // Notify the user if there is an error
            console.log(err); // Log the error
        }).then((connection) => {
            if(connection.playing) { // Stop playing if the connection is playing something
                connection.stopPlaying();
            }
            connection.play(filename); // Play the file and notify the user
            bot.createMessage(msg.channel.id, `Now playing **${filename}**`);
            connection.once("end", () => {
                bot.createMessage(msg.channel.id, `Finished **${filename}**`); // Say when the file has finished playing
            });
        });
    }
});


bot.registerCommandAlias("halp", "help"); // Alias !halp to !help

bot.registerCommand("ping", cmds.ping, { // Make a ping command
// Responds with "Pong!" when someone says "!ping"
    description: "Pong!",
    fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored."
});


bot.registerCommand("pong", cmds.pong, { // Make a pong command
// Responds with a random version of "Ping!" when someone says "!pong"
    description: "Ping!",
    fullDescription: "This command could also be used to check if the bot is up. Or entertainment when you're bored."
});

bot.registerCommand("version", cmds.version, {description: "Get the version"});

bot.registerCommand("testargs", cmds.testargs, {description: "Test command arguments - only for IndoorSkydiver!"})

bot.registerCommand("poke", cmds.poke, {description: "Poke a user"});

bot.registerCommand("avatarlink", cmds.avatarlink, {description: "Get the avatarlink"});

bot.registerCommand("playfile", cmds.playfile, {description: "Play a file"});
/**
 * Sending an embed message.
 * @param {MessageChannel} chan
 * @param {String} content
 * @param {String} title
 * @param {Number} clr
 * @returns Message
 */
function sendEmbed(chan, content, title, clr) {
    if (typeof title === "undefined")
        title = null;
    if (typeof color === "undefined")
        color = null;
    return bot.createMessage(chan.id, {embed: {title: title, description: content, color: clr}})
}

exports.info = funcs.info
exports.checkMsg = chatflag.check
exports.sendEmbed = sendEmbed
exports.color = Color
exports.funcs = funcs


bot.connect();
