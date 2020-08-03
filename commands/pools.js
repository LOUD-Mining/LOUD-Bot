const Discord = require("discord.js");
const loudfoot = require("../configs/footer.json");
const config = require("../configs/config.json");
module.exports.run = async (bot, message, args) => {
    let check = message.channel.id;
    if(message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if(check == config.configs.chID) {
        let poolsEmbed = new Discord.MessageEmbed()
        .setTitle("LOUD Mining Pool Info")
        .setColor("#00720D")
        .setThumbnail(URL = "https://loudmining.com/media/lm-us.png")
        .addField("**USA Stratums**")
        .addField("Monero", '')
        .addField("<network ($ticker)", "Network stats of Pool coins")
        .addField("<software", "Software links per network")
        .addField("Powered by © LOUD Mining 2018-2020", loudfoot.footer);
        return message.channel.send(poolsEmbed);
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
    name: "pools"
}
