const promoFile = require("./configs/promo.json");
const loudFoot = require("./configs/footer.json");
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let check = message.channel.id;
    let correct = "537913904005775361"
    if(check == correct || message.channel.type == "dm") {
        let promoEmbed = new Discord.RichEmbed()
        .setTitle("February Promotion")
        .setColor("#00720D")
        .setThumbnail(URL = "https://loudmining.com/images/loudog.png")
        .addField("Promo Details", (promoFile.promo))
        .addField("How to Register", (promoFile.register))
        .addField("Powered by © LOUD Mining 2018", (loudFoot.footer));
        return message.channel.send(promoEmbed);
    }
    message.channel.bulkDelete(1);
    bot.channels.get("537913904005775361").send(`${message.author} Please command me here or in a DM thanks!`);
    return;
}
module.exports.help = {
    name: "promo"
}