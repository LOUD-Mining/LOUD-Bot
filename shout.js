const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(message.channel.type == "dm") return message.reply("Just quit while you're ahead!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { 
        message.channel.bulkDelete(1);
        message.reply("You do not have permission to use that command!");
    }
    if(!args[0]) return message.channel.send("Wait, WAT?!");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
    return;
}
module.exports.help = {
    name: "shout"
}