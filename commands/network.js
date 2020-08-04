// global variables
const Discord = require("discord.js")
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

        //function to convert hashes per second into a human readable format, add the abbr tag for thousands, millions, etc...
        function convertHashes(hashes) {
            if (hashes < 1e3) {
                return hashes + " H/s"
            }
            else if (hashes > 1e3 && hashes < 1e6) {
                return (hashes / 1e3).toFixed(3) + " KH/s"
            }
            else if (hashes > 1e6 && hashes < 1e9) {
                return (hashes / 1e6).toFixed(3) + " MH/s"
            }
            else if (hashes > 1e9 && hashes < 1e12) {
                return (hashes / 1e9).toFixed(3) + " GH/s"
            }
            else if (hashes > 1e12 && hashes < 1e15) {
                return (hashes / 1e12).toFixed(3) + " TH/s"
            }
            else if (hashes > 1e15 && hashes < 1e18) {
                return (hashes / 1e15).toFixed(3) + " PH/s"
            }
            else if (hashes > 1e18 && hashes < 1e21) {
                return (hashes / 1e18).toFixed(3) + " EH/s"
            }
        }

        //function to convert hashes needed to "crack a block" into human readable format, add abbr tag for thousands, millions, etc...
        function convertDifficulty(difficulty) {
            if (difficulty < 1e3) {
                return difficulty + " H"
            }
            else if (difficulty > 1e3 && difficulty < 1e6) {
                return (difficulty / 1e3).toFixed(3) + " KH"
            }
            else if (difficulty > 1e6 && difficulty < 1e9) {
                return (difficulty / 1e6).toFixed(3) + " MH"
            }
            else if (difficulty > 1e9 && difficulty < 1e12) {
                return (difficulty / 1e9).toFixed(3) + " GH"
            }
            else if (difficulty > 1e12 && difficulty < 1e15) {
                return (difficulty / 1e12).toFixed(3) + " TH"
            }
            else if (difficulty > 1e15 && difficulty < 1e18) {
                return (difficulty / 1e15).toFixed(3) + " PH"
            }
            else if (difficulty > 1e18 && difficulty < 1e21) {
                return (difficulty / 1e18).toFixed(3) + " EH"
            }
        }
        
        // check arguments and convert to lower case
        if (args.toString().toLowerCase() == "upx") {
            apiUrl = pools.coin.upx.apiUrl
            blkTime = 120
            
            //using node-fetch, we get the api response, parse it to json, and format for sending to discord
            fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                height = data.network.height
                difficulty = convertDifficulty(data.network.difficulty)
                hashrate = convertHashes(data.network.difficulty / blkTime)

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
                difficulty = convertDifficulty(data.network.difficulty)
                hashrate = convertHashes(data.network.difficulty / blkTime)

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
                difficulty = convertDifficulty(data.pools.verus.poolStats.networkDiff)
                hashrate = convertHashes(parseInt(data.pools.verus.poolStats.networkSols))
                
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