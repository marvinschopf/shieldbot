#!/usr/bin/env node
require('coffee-script/register');
const Discord = require('discord.js');
const fs      = require('fs')
const { CmdParser } = require('./cmdparser.js')
const Eris = require('eris');
const colors = require('colors')
const aload = require('after-load');
const mysql = require('mysqli');
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

/**
 * Short function for sending a colored
 * error message in console.
 * @param {*String} content 
 */
function error(content) {
    console.log(`[ERROR] ${content}`.red)
}

/**
 * Short function for sending a colored
 * information message in console.
 * @param {*String} content 
 */
function info(content) {
    console.log(`${"[INFO] ".cyan} ${content}`)
}

info("Reading configuration...");
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

info("Loading ErisClient...");
const bot = new Eris.CommandClient(config.token, {}, {
  description: config.description,
  owner: config.owner,
  prefix: config.prefix
});


// Set up database connection
info("Setting up MySql connection...")
exports.dbcon = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

// Connecting database
exports.dbcon.connect();


info("Setting up modules...");
funcs.setBot(bot);
cmds.setBot(bot);
events.setBot(bot);
cmds.setVersion(VERSION);
chatflag.setBot(bot);

info("Done with setup!");

/*
  ≤=======≥
  main
  ≤=======≥
*/

bot.on("ready", () => {
  funcs.setStatus("NodeJS");
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
exports.chatflag = chatflag
exports.sendEmbed = sendEmbed
exports.color = Color
exports.funcs = funcs
exports.info = info
exports.error = error


bot.connect();
