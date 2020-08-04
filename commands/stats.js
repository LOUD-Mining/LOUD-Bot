const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../configs/config.json");
const pools = require("../configs/pools.json");
module.exports.run = async (bot, message, args) => {
    var check = message.channel.id;
    if (message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if (check == config.configs.chID) {

        // Conversion Stuff
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
          };
        }
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

        // Thanks to this guy: https://stackoverflow.com/a/6078873
        function timeConverter(timestamp){
            var a = new Date(timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        }

        // USA Stats
        if (`${args[0]}`.toLowerCase() == "usa"){
            if (`${args[1]}`.toLowerCase() == "xmr") {
                var api = pools.coin.xmr.apiUrl
                var donation = `497eMhzAuwyLj6Mct54GETCHyrmYkXVGKXxhZDfgsLJ2D7XPobiAMGZhsTrFyuxcYPJvMvdQbekWQS3DXLSuy3Y18YLcsAQ`
                displayCN(api, donation)
            }
            else if (`${args[1]}`.toLowerCase() == "upx") {
                var api = pools.coin.upx.apiUrl
                var donation = `UPX1brGoBKBMpKuqyPSJE9424fpP4HYNy6V9XTZnTdVk36HjzcRmpJT7wbyN3CRLrJB8TTQK2wWf5XGQLkKAXCon5HiDNMRA1q`
                displayCN(api, donation)
            }
            else if (`${args[1]}`.toLowerCase() == "vrsc") {
                var api = pools.coin.vrsc.apiUrl
                displayKMD(api)
            }
            else {
                message.channel.send("Please enter a valid network (available USA networks: xmr, upx, vrsc)")
            }
        }
        // BE Stats
        else if(`${args[0]}`.toLowerCase() == "be") {
            if (`${args[1]}`.toLowerCase() == "xmr") {
                var api = pools.coin.xmr.apiUrlBE
                var donation = `497eMhzAuwyLj6Mct54GETCHyrmYkXVGKXxhZDfgsLJ2D7XPobiAMGZhsTrFyuxcYPJvMvdQbekWQS3DXLSuy3Y18YLcsAQ`
                displayCN(api, donation)
            }
            else if (`${args[1]}`.toLowerCase() == "upx") {
                var api = pools.coin.upx.apiUrlBE
                var donation = `UPX1brGoBKBMpKuqyPSJE9424fpP4HYNy6V9XTZnTdVk36HjzcRmpJT7wbyN3CRLrJB8TTQK2wWf5XGQLkKAXCon5HiDNMRA1q`
                displayCN(api, donation)
            }
            else {
                message.channel.send("Please enter a valid network (available BE networks: xmr, upx)")
            }
        }
        else {
            return message.channel.send("Please enter a valid location (locations available: usa, be)")
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
                    "date": timeConverter(data.lastblock.timestamp),
                    "hash": data.lastblock.hash
                }
                var poolconfig = {
                    "fee": parseFloat(data.config.fee + data.config.donation[donationaddress]).toFixed(1),
                    "interval": (data.config.paymentsInterval / 60).toFixed(1)
                }

                let CNStatsEmbed  = new Discord.MessageEmbed()
                .setTitle(args[0].toUpperCase() + " " + args[1].toUpperCase() + " Pool Statistics")
                .setColor("#00720D")
                .addField("Pool hashrate (PROP/SOLO): ", convertHashes(prophash) + " **/** " + convertHashes(solohash))
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