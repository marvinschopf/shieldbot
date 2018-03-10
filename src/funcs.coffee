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
