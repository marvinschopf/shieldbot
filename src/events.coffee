main = require "./main.js"
mysql = require "mysql"
PushBullet = require "pushbullet"
fs = require 'fs'

bot = null
exports.setBot = (b) ->
  bot = b
  do registerEvents


registerEvents = () ->
  bot.on "ready", () ->
    console.log "I am ready!"

  bot.on "messageCreate", (msg) ->
    main.checkMsg msg
