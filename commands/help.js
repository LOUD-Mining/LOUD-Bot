const Discord = require("discord.js");
const loudfoot = require("../configs/footer.json");
const config = require("../configs/config.json");
module.exports.run = async (bot, message) => {
    let check = message.channel.id;
    if(message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if(check == config.configs.chID) {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Available Commands")
        .setColor("#00720D")
        .setThumbnail(URL = "https://loudmining.com/media/lm-us.png")
        .addField("<help", "This help message")
        .addField("<pools", "List of LOUD Mining Pools and their locations")
        .addField("<network (ticker)", "Network stats of Pool coins *eg <network upx*")
        .addField("<mystats (pool location) (address)", "Get statistics of your miner from specific pool *eg <mystats usa UPX1oKXYsdsHvwcGeeDyyjECUERFv4d1cgGZXEgMuCnE1QJUN66p8cgaKQxtMvdKtYJtF41cdnQLP7W5YBeApXQE6oTQQRDUXg*")
        .addField("<stats (network) (ticker)", "Get specific pool statistics per ticker *eg <stats USA upx*")
        .addField("<software", "Software links per network")
        .addField("Powered by © LOUD Mining 2018-2020", loudfoot.footer);
        return message.channel.send(helpEmbed);
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
    name: "help"
}
