const Web3 = require('web3')
const { walletWarningEmbed } = require('../embed')
const dotenv = require('dotenv')
const db = require('../db/db')

dotenv.config()

var web3 = new Web3(process.env.WEB3_URL)

//TODO: finish logic
module.exports = async function save_wallet(message) {
  const rawAddress = message.content.split(' ')[2]
  if (typeof rawAddress !== 'undefined') {
    try {
      const xdaiAddress = web3.utils.toChecksumAddress(rawAddress)
      db.handleData(message, null, null, xdaiAddress)
      return
    } catch(e) {
      console.error('invalid ethereum address', e.message)
    }
  }
  message.channel.send(walletWarningEmbed())
}