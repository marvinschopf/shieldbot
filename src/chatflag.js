const main = require('./main.js')
const fs = require('fs')
const colors = require('colors')
require('extendutils')

var bot

const type = {
  BLACKLISTED_LINK: "BLACKLISTED_LINK"
}

var flags = {}

function setBot(_bot) {
  bot = _bot
  if(fs.existsSync('flags.json'))
    flags = require('../flags.json')
}

function check(msg) {
  var memb = msg.member
  var cont = msg.content
  if(true) {
    var linkflags = !flags.links ? [] : flags.links
    if(cont.contains(linkflags) && cont.contains(['http://', 'https://', 'www.'])) {
      bot.deleteMessage(msg.channel.id, msg.id, `Not allowed content: ${type.BLACKLISTED_LINK}`)
      bot.getDMChannel(memb.id)
        .then((chan) => main.sendEmbed(chan, "Sending flaged links **is absolutly not allowed** on this guild, so your message got deleted and an the flag was saved in the database.", "NOT ALLOWED LINK", main.color.red))
    }
  }
}

exports.check = check
exports.setBot = setBot
