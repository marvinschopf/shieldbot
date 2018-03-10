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

exports.avatarlink = (msg, args) ->
  memb = msg.member
  if msg.mentions && msg.mentions != null
    for mention in msg.mentions
      if mention.avatarURL
        msg.reply mention.username + mention.avatarURL
      else
        msg.reply mention.username + " unknown"
  else
    msg.reply "Not found!"
