const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let check = message.channel.id;
    let correct = "537913904005775361";
    if(message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if(check == correct) {
    return message.channel.send(`Have a cold one ${message.author.username}`, {file: "https://webcn.loudmining.com/loudbot/img/beer.png"});
    }
    message.channel.bulkDelete(1);
    bot.channels.get("537913904005775361").send(`${message.author} Please command me here!`);
    return;
}
module.exports.help = {
    name: "beer"
}
