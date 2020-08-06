// global variables
const Discord = require("discord.js")
const functions = require("../functions.js")
const fetch = require("node-fetch")
const config = require("../configs/config.json")
const pools = require("../configs/pools.json")
var height
var difficulty
var hashrate

//command
module.exports.run = async (bot, message, args) => {

    //let's check if user has messaged the correct channel
    var check = message.channel.id
    if (message.channel.type == "dm") return message.channel.send("Sorry can't do that here!")

    //check looks good, let's do this!
    if(check == config.configs.chID) {
        
        // check arguments and convert to lower case
        if (args.toString().toLowerCase() == "upx") {
            apiUrl = pools.coin.upx.apiUrl
            blkTime = 120
            
            //using node-fetch, we get the api response, parse it to json, and format for sending to discord
            fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                height = data.network.height
                difficulty = functions.convertDifficulty(data.network.difficulty)
                hashrate = functions.convertHashes(data.network.difficulty / blkTime)

                //create discord rich embedded message
                let networkEmbed = new Discord.MessageEmbed()
                .setTitle("UPX Network Stats")
                .setColor("#00720D")
                .addField("Current Block Height: ", height)
                .addField("Current Network Difficulty ", difficulty)
                .addField("Current Network Hashrate: ", hashrate)

                //send message to channel command originated in
                return message.channel.send(networkEmbed)
            })
            return
        }

        // check arguments and convert to lower case
        else if (args.toString().toLowerCase() == "xmr") {
            apiUrl = pools.coin.xmr.apiUrl
            blkTime = 120

            //using node-fetch we get the api response, parse it to json, and format for sending to discord
            fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                height = data.network.height
                difficulty = functions.convertDifficulty(data.network.difficulty)
                hashrate = functions.convertHashes(data.network.difficulty / blkTime)

                //create discord rich embedded message
                let networkEmbed = new Discord.MessageEmbed()
                .setTitle("XMR Network Stats")
                .setColor("#00720D")
                .addField("Current Block Height: ", height)
                .addField("Current Network Difficulty ", difficulty)
                .addField("Current Network Hashrate: ", hashrate)

                //send message to channel command originated in
                return message.channel.send(networkEmbed)
            })
        return
        }
        
        // check arguments and convert to lower case
        else if (args.toString().toLowerCase() == "vrsc") {
            apiUrl = pools.coin.vrsc.apiUrl
 
            //using node-fetch we get the api response, parse it to json, and format for sending to discord
            fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                height = data.pools.verus.poolStats.networkBlocks
                difficulty = functions.convertDifficulty(data.pools.verus.poolStats.networkDiff)
                hashrate = functions.convertHashes(parseInt(data.pools.verus.poolStats.networkSols))
                
                //create discord rich embedded message
                let networkEmbed = new Discord.MessageEmbed()
                .setTitle("VRSC Network Stats")
                .setColor("#00720D")
                .addField("Current Block Height: ", height.toString())
                .addField("Current Network Difficulty ", difficulty.toString())
                .addField("Current Network Hashrate: ", hashrate.toString())

                //send message to channel command originated in
                return message.channel.send(networkEmbed)
            })
            return
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
    name: "network"
}