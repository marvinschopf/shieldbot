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
  main.info msg
  main.info args
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
