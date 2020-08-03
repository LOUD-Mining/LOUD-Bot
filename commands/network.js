const Discord = require("discord.js");
const config = require("../configs/config.json");
var height;
var difficulty;
var hashrate;
module.exports.run = async (bot, message, args) => {
    var check = message.channel.id;
    if (check != config.configs.chID) return;
    if (message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
      function getStats(apiUrl, data) {
        fetch(apiUrl).then(upxres => upxres.json()).then(data);
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
      if (args.toString().toLowerCase() == "upx") {
        apiUrl = config.network.upx;
        getStats;
        height = data.network.height;
        difficulty = convertDifficulty(data.network.difficulty);
        hashrate = convertHashes(difficulty / 120);
        networkEmbed = new Discord.MessageEmbed()
          .setTitle("UPX Network Stats")
          .setColor("#00720D")
          .addField("Current Block Height: " + height.toString())
          .addField("Current Network Difficulty " + difficulty.toString())
          .addField("Current Network Hashrate: " + hashrate.toString());
          return message.channel.send(networkEmbed);
      }
      else if (args.toString().toLowerCase() == "xmr") {
        apiUrl = config.network.xmr;
        getStats;
        height = data.network.height;
        difficulty = convertDifficulty(data.network.difficulty);
        hashrate = convertHashes(difficulty / 120);
        networkEmbed = new Discord.MessageEmbed()
          .setTitle("XMR Network Stats")
          .setColor("#00720D")
          .addField("Current Block Height: " + height.toString())
          .addField("Current Network Difficulty " + difficulty.toString())
          .addField("Current Network Hashrate: " + hashrate.toString());
          return message.channel.send(networkEmbed);
      }
      else if (args.toString().toLowerCase() == "vrsc") {
        apiUrl = config.network.vrsc;
        getStats;
        height = data.pools.verus.poolStats.networkBlocks;
        difficulty = convertDifficulty(data.pools.verus.poolStats.networkDiff);
        hashrate = convertHashes(parseInt(data.pools.verus.poolStats.networkSols));
        networkEmbed = new Discord.MessageEmbed()
          .setTitle("VRSC Network Stats")
          .setColor("#00720D")
          .addField("Current Block Height: " + height.toString())
          .addField("Current Network Difficulty " + difficulty.toString())
          .addField("Current Network Hashrate: " + hashrate.toString());
          return message.channel.send(networkEmbed);
      }
  message.channel.bulkDelete(1);
  bot.channels.cache.get(config.configs.chID).send(`${message.author} Please command me here thanks!`);
  setTimeout(delMsg, 3000);
  function delMsg() {
      bot.channels.cache.get(config.configs.chID).bulkDelete(1);
  }
  return;  
}
module.exports.help = {
    name: "network"
}