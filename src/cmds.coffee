main = require "./main.js"
mysql = require "mysql"
PushBullet = require "pushbullet"
fs = require 'fs'

bot = null
exports.setBot = (b) -> bot = b

version = null
exports.setVersion = (v) -> version = v

exports.ping = () -> "Pong!"
exports.pong = () -> "Ping!"
exports.version = () -> "Version: "+version
exports.testargs = (msg, args) ->
  console.log(msg)
  console.log(args)
exports.poke = (msg, args) ->
  for mention in msg.mentions
    bot.deleteMessage msg.channel.id, msg.id, 'Command removed' 
    bot.getDMChannel(mention.id).then((chan) => main.sendEmbed(chan,"Poke: "+msg.author.username+" poked you!", "Poke", main.color.orange))
