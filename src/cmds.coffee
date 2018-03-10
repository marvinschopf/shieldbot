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
