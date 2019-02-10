const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let check = message.channel.id;
    let correct = "537913904005775361";
    if(message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if(check == correct) {
    message.channel.send(`Here's your coffee ${message.author.username}`, {file: "https://webcn.loudmining.com/loudbot/img/coffeespill.jpg"});
    setTimeout(function() {
        message.channel.send("***Awww man!! Now look what you made me do!!***");
    }, 3000);
    return;
    }
    message.channel.bulkDelete(1);
    bot.channels.get("537913904005775361").send(`${message.author} Please command me here!`);
    return;
}
module.exports.help = {
    name: "coffee"
}
