const main = require('./main.js')
const mysqli = require('mysql')
const PushBullet = require('pushbullet')
const fs = require('fs')

var bot = null
function setBot(b) {
  bot = b;
}
