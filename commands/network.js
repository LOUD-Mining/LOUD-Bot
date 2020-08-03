const Discord = require("discord.js")
const config = require("../configs/config.json")

module.exports.run = async (bot, message, args) => {
    let check = message.channel.id
    if (message.channel.type == "dm") {
        return message.channel.send("Sorry can't do that here!")
    }
    if (check == config.configs.chID) {

        let networkEmbed
        let api

        function getAPIStats(api) {
            return Promise.resolve($.ajax({
                url: api,
                dataType: 'json',
                type: 'GET' 
            }))
        }

        function convertHashes(hashes) {
            if (hashes < 1e3) {
                return hashes + "H/s"
            }
            else if (hashes > 1e3 && hashes < 1e6) {
                return (hashes / 1e3).toFixed(3) + "KH/s"
            }
            else if (hashes > 1e6 && hashes < 1e9) {
                return (hashes / 1e6).toFixed(3) + "MH/s"
            }
            else if (hashes > 1e9 && hashes < 1e12) {
                return (hashes / 1e9).toFixed(3) + "GH/s"
            }
            else if (hashes > 1e12 && hashes < 1e15) {
                return (hashes / 1e12).toFixed(3) + "TH/s"
            }
            else if (hashes > 1e15 && hashes < 1e18) {
                return (hashes / 1e15).toFixed(3) + "PH/s"
            }
            else if (hashes > 1e18 && hashes < 1e21) {
                return (hashes / 1e18).toFixed(3) + "EH/s"
            }
        }

        function convertDifficulty(difficulty) {
            if (difficulty < 1e3) {
                return difficulty + "H"
            }
            else if (difficulty > 1e3 && difficulty < 1e6) {
                return (difficulty / 1e3).toFixed(3) + "KH"
            }
            else if (difficulty > 1e6 && difficulty < 1e9) {
                return (difficulty / 1e6).toFixed(3) + "MH"
            }
            else if (difficulty > 1e9 && difficulty < 1e12) {
                return (difficulty / 1e9).toFixed(3) + "GH"
            }
            else if (difficulty > 1e12 && difficulty < 1e15) {
                return (difficulty / 1e12).toFixed(3) + "TH"
            }
            else if (difficulty > 1e15 && difficulty < 1e18) {
                return (difficulty / 1e15).toFixed(3) + "PH"
            }
            else if (difficulty > 1e18 && difficulty < 1e21) {
                return (difficulty / 1e18).toFixed(3) + "EH"
            }
        }
        var height
        var difficulty
        var hashrate
        if (check == config.configs.chID) {
            if (args.toString().toLowerCase() == "upx") {
                networkEmbed = new Discord.MessageEmbed()
                api = "https://loudmining.com/upx/api/stats"

                (async () => {
                    getAPIStats(api).then(function(data) {
                        height = data.network.height
                        difficulty = convertDifficulty(data.network.difficulty)
                        hashrate = convertHashes((difficulty / 120))
                    })
                })

                .setTitle("UPX Network Stats")
                .setColor("#00720D")
                .addField("Current Block Height: " + height.toString())
                .addField("Current Network Difficulty " + difficulty.toString())
                .addField("Current Network Hashrate: " + hashrate.toString())

                return message.channel.send(networkEmbed)

            }
            else if (args.toString().toLowerCase() == "xmr") {
                networkEmbed = new Discord.MessageEmbed()
                api = "https://loudmining.com/xmr/api/stats"

                (async () => {
                    getAPIStats(api).then(function(data) {
                        height = data.network.height
                        difficulty = convertDifficulty(data.network.difficulty)
                        hashrate = convertHashes((difficulty / 120))
                    })
                })

                .setTitle("XMR Network Stats")
                .setColor("#00720D")
                .addField("Current Block Height: " + height.toString())
                .addField("Current Network Difficulty " + difficulty.toString())
                .addField("Current Network Hashrate: " + hashrate.toString())

                return message.channel.send(networkEmbed)
                
            }
            else if (args.toString().toLowerCase() == "vrsc") {
                api = "https://loudmining.com/verus/api/stats"
                networkEmbed = new Discord.MessageEmbed()

                (async () => {
                    getAPIStats(api).then(function(data) {
                        height = data.pools.verus.poolStats.networkBlocks
                        difficulty = convertDifficulty(parseInt(data.pools.verus.poolStats.networkDiff))
                        hashrate = convertHashes(parseInt(data.pools.verus.poolStats.networkSols))
                    })
                })

                .setTitle("VRSC Network Stats")
                .setColor("#00720D")
                .addField("Current Block Height: " + height.toString())
                .addField("Current Network Difficulty " + difficulty.toString())
                .addField("Current Network Hashrate: " + hashrate.toString())

                return message.channel.send(networkEmbed)

            }
        }
    }

    message.channel.bulkDelete(1)
    bot.channels.get(config.configs.chID).send(`${message.author} Please command me here thanks`)
    
}
module.exports.help = {
    name: "network"
}