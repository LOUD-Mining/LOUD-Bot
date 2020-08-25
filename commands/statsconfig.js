//global variables
const Discord = require("discord.js"),
  config = require("../configs/config.json"),
  functions = require("../functions")

//command
module.exports.run = async (bot, message, args) => {
  //let's put some data into variables
  var memberID = message.author.id
  var network = args[0]
  var walletAddress = args[1]

  //let's check if user has messaged the correct channel
  let channelCheck = message.channel.id
  if(!network) return message.channel.send("You have to include a coin ticker and wallet address :man_facepalming:")
  if(!walletAddress) return message.channel.send("Wait, you didn't include the wallet address :weary:")
  if(message.channel.type !== "dm") return message.channel.send("Sorry can't do that here!")

  //check looks good, let's do this!
  if(channelCheck == config.configs.chID) {
    //function to check if mining on pool
    if (functions.fetchMinerStats(network, walletAddress) == false) {
      nominerEmbed = new Discord.MessageEmbed()
      .setTitle(":thinking: Are you mining to the pool?\nI cannot find your stats, so therefore I cannot register your address. :frowning:")
      .setColor("#00720D")
      return message.channel.send(nominerEmbed)
    }

    //make a query to the database to check if wallet address exists
    functions.walletCheck(network, walletAddress)

    //check query status
    if (status = 1) {
      //address does not exist, add wallet address to database
      functions.addWallet(network, walletAddress, memberID)
      if (status = true && newuser == true) {
        //send message to user letting them know registration successful
        successEmbed = new Discord.MessageEmbed()
        .setTitle("Thank you for registering your " + network + "wallet address!\n" + wallet + "\nYou may now use the mystats command!")
        .setColor("#00720D")
        return memberID.send(successEmbed)
      } else if (status = false (err)){
        //send message to user letting them know registration failed
        failEmbed = new Discord.MessageEmbed()
        .setTitle("Oh no!! :grimace: Something happened while trying to register your " + network + " wallet address.\nPlease try again in a few moments.")
        .setColor("#00720D")
        return memberID.send(failEmbed)
      }
    } else if (status = 2) {
      dupeEmbed = new Discord.MessageEmbed()
      .setTitle(":astonished:\n" + wallet + " has already been registered!\nPlease use mystats command to retrieve your mining stats.")
      .setColor("#00720D")
      return memberID.send(dupeEmbed)
    } else if (status = 3) {
      changeEmbed = new Discord.MessageEmbed()
      .setTitle("Excuse me, but you've already registered this address for " + network + ".")
      .setColor("#00720D")
      return memberID.send(changeEmbed)
    }
  }
  // if check fails delete message from wrong channel, mention user with message in correct channel, wait xxxx ms and delete own message
  message.channel.bulkDelete(1)
  bot.channels.cache.get(config.configs.chID).send(`${message.author} Please command me here thanks!`)
  setTimeout(delMsg, 3000)
  function delMsg() {
      bot.channels.cache.get(config.configs.chID).bulkDelete(1)
  }
  return
}
//needed for command name !important
module.exports.help = {
    name: "statsconfig"
}
