const Discord = require("discord.js");
const loudfoot = require("../configs/footer.json");
const config = require("../configs/config.json");
module.exports.run = async (bot, message) => {
    let check = message.channel.id;
    if(message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if(check == config.configs.chID) {
        const poolsEmbed = new Discord.MessageEmbed()
        .setTitle("LOUD Mining Pool Info")
        .setColor("#00720D")
        .setThumbnail(URL = "https://loudmining.com/media/lm-us.png")
        .addField("**USA Stratums**", "List of USA Stratums")
        .addField("Monero", 'https://loudmining.com/xmr/')
        .addField("Mining Ports:", "**Low End Hardware (IoT's)**: loudmining.com:2100\n**Mid Range Hardware (CPU or GPU)**: loudmining.com:2101\n**High End Hardware (GPU Rigs)**: loudmining.com:2102\n**Cloud Mining**: loudmining.com:2102")
        .addField("Uplexa", 'https://loudmining.com/upx/')
        .addField("Mining Ports:", "**Low End Hardware (IoT's)**: loudmining.com:2000\n**Old/Mid Range Hardware**: loudmining.com:2001\n**High End Hardware (CPU or GPU)**: loudmining.com:2002\n**GPU Mining Port (GPU Rigs)**: loudmining.com:2102")
        .addField("Verus", 'https://loudmining.com/verus/')
        .addField("Mining Ports: ", " **Difficulty (8192)**: stratum+tcp://loudmining.com:2300\n**Difficulty (16384)**: stratum+tcp://loudmining.com:2301")
        .addField('\u200b', '\u200b')
        .addField("**BE Stratums**", "List of BE Stratums")
        .addField("Monero", "https://be.loudmining.com/xmr/")
        .addField("Mining Ports:", "**Low End Hardware (IoT's)**: be.loudmining.com:2100\n**Mid Range Hardware (CPU or GPU)**: be.loudmining.com:2101\n**High End Hardware (GPU Rigs)**: be.loudmining.com:2102\n**Cloud Mining**: be.loudmining.com:2102")
        .addField("Uplexa", "https://be.loudmining.com/upx/")
        .addField("Mining Ports:", "**Low End Hardware (IoT's)**: be.loudmining.com:2000\n**Old/Mid Range Hardware**: be.loudmining.com:2001\n**High End Hardware (CPU or GPU)**: be.loudmining.com:2002\n**GPU Mining Port (GPU Rigs)**: be.loudmining.com:2102")
        .addField('\u200b', '\u200b')
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
