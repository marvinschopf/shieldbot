main = require "./main.js"
mysql = require "mysql"
PushBullet = require "pushbullet"
fs = require 'fs'

bot = null
exports.setBot = (b) -> bot = b

exports.setStatus = (status) ->
  bot.editStatus {name: status}

exports.info = (i) ->
  console.log(i)

exports.poke = (msg) ->
  for mention in msg.mentions
    bot.deleteMessage msg.channel.id, msg.id, 'Command removed'
    bot.getDMChannel(mention.id).then((chan) => main.sendEmbed(chan,"Poke: "+msg.author.username+" poked you!", "Poke", main.color.orange))
