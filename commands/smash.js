const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(message.channel.type == "dm") return message.reply("Just quit while you're ahead!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { 
        message.channel.bulkDelete(1);
        message.reply("You do not have permission to use that command!");
    }
    if(!args[0]) return message.channel.send("Wait, WAT?!");
    message.channel.bulkDelete(args[0]).then (() => {
        message.channel.send(`Smashed ${args[0]} messages.`).then(msg => msg.delete(1000));
    });
    return;
}
module.exports.help = {
    name: "smash"
}
