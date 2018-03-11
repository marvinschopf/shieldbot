main = require './main.js'
fs   = require 'fs'
require 'extendutils'

bot = null

exports.setBot = (b) ->
  bot = b
  if fs.existsSync 'flags.json'
    flags = require './flags.json'

type = {
  BLACKLISTED_LINK: "BLACKLISTED_LINK",
  BLACKLISTED_WORD: "BLACKLISTED_WORD"
}

exports.check = (msg) ->
  memb = msg.member
  cont = msg.content
  if true
    linkflags = !flags.links ? [] : flags.links
    wordflags = !flags.words ? [] : flags.words
    if cont.contains(linkflags) && cont.contains(['http://', 'https://', 'www.'])
      bot.deleteMessage msg.channel.id, msg.id, 'Not allowed content: #{type.BLACKLISTED_LINK}'

    if cont.contains(wordflags)
      bot.deleteMessage msg.channel.id, msg.id, 'Not allowed content: #{type.BLACKLISTED_WORD}'