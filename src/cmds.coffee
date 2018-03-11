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
  main.funcs.poke msg

exports.avatarlink = (msg, args) ->
  memb = msg.member
  if msg.mentions && msg.mentions != null
    for mention in msg.mentions
      if mention.avatarURL
        return mention.username + ": " + mention.avatarURL
      else
        return mention.username + ": unknown!"
  else
    return "Not found!"

exports.playfile = (msg, args) ->
  if args
    if args.length > 0
      if !msg.channel.guild
        return "This command can only be run on a server!"

      if !msg.member.voiceState.channelID
        return "You are not in a voice channel!"

      filename = msg.content.substring 6
      bot.joinVoiceChannel(msg.member.voiceState.channelID).catch (err) ->
        return "Error joining voice channel: "  + err.messages
        console.log(err)
      .then (connection) ->
        if connection.playing
          do connection.stopPlaying
        connection.play filename
        return 'Now playing **#{filename}**'
        connection.once "end", () ->
          bot.createMessage msg.channel.id, 'Finished **#{$filename}**'

    else
      return "No file specified!"
  else
    return "No file specified!"
