#!/usr/bin/env node
require('coffee-script/register');
const Discord = require('discord.js');
const fs      = require('fs')
const { CmdParser } = require('./cmdparser.js')
const Eris = require('eris');
const funcs = require("./funcs.coffee");
const cmds = require('./cmds.coffee');
const events = require('./events.coffee');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

const bot = new Eris.CommandClient(config.token, {}, {
  description: config.description,
  owner: config.owner,
  prefix: config.prefix
});

funcs.setBot(bot);
cmds.setBot(bot);
events.setBot(bot);

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





bot.connect();
