const Discord = require("discord.js"),
 functions = require("../functions.js"),
 fetch = require("node-fetch"),
 config = require("../configs/config.json"),
 pools = require("../configs/pools.json")
module.exports.run = async (bot, message, args) => {
    var check = message.channel.id
    var location = args[0].toString().toLowerCase()
    var network = args[1].toString().toLowerCase()
    var cnApiCall = pools.stratum[location] + "/" + network + pools.api.cn.stats
    var snApiCall = pools.stratum[location] + "/verus" + pools.api.sn.stats
    if (message.channel.type == "dm") return message.channel.send("Sorry can't do that here!")
    if (check == config.configs.chID) {

        // USA Stats
        if (location == "usa"){
            var locImg = "lm-us.png"
            if (network == "xmr") {
                var api = cnApiCall
                var donation = `497eMhzAuwyLj6Mct54GETCHyrmYkXVGKXxhZDfgsLJ2D7XPobiAMGZhsTrFyuxcYPJvMvdQbekWQS3DXLSuy3Y18YLcsAQ`
                displayCN(api, donation, locImg)
            }
            else if (network == "upx") {
                var api = cnApiCall
                var donation = `UPX1brGoBKBMpKuqyPSJE9424fpP4HYNy6V9XTZnTdVk36HjzcRmpJT7wbyN3CRLrJB8TTQK2wWf5XGQLkKAXCon5HiDNMRA1q`
                displayCN(api, donation, locImg)
            }
            else if (network == "vrsc") {
                var api = snApiCall
                displayKMD(api)
            }
            else {
                message.channel.send(":interrobang: Please enter a valid network :interrobang: (available USA networks: xmr, upx, vrsc)")
            }
        }
        
        // BE Stats
        else if(location == "be") {
            var locImg = "lm-be.png"
            if (network == "xmr") {
                var api = cnApiCall
                var donation = `497eMhzAuwyLj6Mct54GETCHyrmYkXVGKXxhZDfgsLJ2D7XPobiAMGZhsTrFyuxcYPJvMvdQbekWQS3DXLSuy3Y18YLcsAQ`
                displayCN(api, donation, locImg)
            }
            else if (network == "upx") {
                var api = cnApiCall
                var donation = `UPX1brGoBKBMpKuqyPSJE9424fpP4HYNy6V9XTZnTdVk36HjzcRmpJT7wbyN3CRLrJB8TTQK2wWf5XGQLkKAXCon5HiDNMRA1q`
                displayCN(api, donation, locImg)
            }
            else {
                message.channel.send(":interrobang: Please enter a valid network :interrobang: (available BE networks: xmr, upx)")
            }
        }
        else {
            return message.channel.send(":interrobang: Please enter a valid location:interrobang: (locations available: usa, be)")
        }

        function displayCN(apicall, donationaddress) {
            fetch(apicall)
            .then(result => result.json())
            .then(data => {
                var prophash = data.pool.hashrate
                var solohash = data.pool.hashrateSolo
                var propminers = data.pool.miners
                var solominers = data.pool.minersSolo
                var propworkers = data.pool.workers
                var soloworkers = data.pool.workersSolo
                var proptotal = data.pool.totalBlocks
                var solototal = data.pool.totalBlocksSolo
                var lastfound = {
                    "date": functions.timeConverter(data.lastblock.timestamp),
                    "hash": data.lastblock.hash
                }
                var poolconfig = {
                    "fee": parseFloat(data.config.fee + data.config.donation[donationaddress]).toFixed(1),
                    "interval": (data.config.paymentsInterval / 60).toFixed(1)
                }

                let CNStatsEmbed  = new Discord.MessageEmbed()
                .setTitle(args[0].toUpperCase() + " " + args[1].toUpperCase() + " Pool Statistics")
                .setThumbnail(URL = `https://loudmining.com/media/${locImg}`)
                .setColor("#00720D")
                .addField("Pool hashrate (PROP/SOLO): ", functions.convertHashes(prophash) + " **/** " + functions.convertHashes(solohash))
                .addField("Pool Miners (PROP/SOLO): ", propminers.toString() + "**/**" + solominers.toString())
                .addField("Pool Workers (PROP/SOLO): ", propworkers.toString() + "**/**" + soloworkers.toString())
                .addField("Total Blocks Found (PROP/SOLO): ", proptotal.toString() + "**/**" + solototal.toString())
                .addField("Last Found Block:", "Block Hash:\n" + lastfound["hash"] + "\n" + "Time found:\n" + lastfound["date"])
                .addField("Pool Configuration:", "Payment Interval: " + poolconfig["interval"] + "Minutes\n Fee: " + poolconfig["fee"] + "%")

                return message.channel.send(CNStatsEmbed)
            })
        }

        function displayKMD(apicall) {
            fetch(apicall)
            .then(
                result => result.json()
            )
            .then(data => {
                
            })
        }
    }
}




  /*message.channel.bulkDelete(1);
  bot.channels.cache.get(config.configs.chID).send(`${message.author} Please command me here thanks!`);
  setTimeout(delMsg, 3000);
  function delMsg() {
      bot.channels.cache.get(config.configs.chID).bulkDelete(1);
  }
  return;*/
module.exports.help = {
    name: "stats"
}