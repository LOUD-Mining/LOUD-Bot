const loudFoot = require("./configs/footer.json");
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let check = message.channel.id;
    let correct = "537913904005775361";
    if (message.channel.type == "dm") {
        return message.channel.send("Sorry can't do that here!");
    }
    if(check == correct) {
        if (!args[0]) {
            return message.reply("Aww man...something went wrong...\n\nTry **vrsc** or **web** after your command.");
        }
        var title;
        var cpuMiners;
        var nvidiaGpuMiners;
        var amdGpuMiners;
        var guiWallet;
        if (args[0] == "vrsc") {
            title = "VerusCoin";
            cpuMiners = `CCminer\nhttps://github.com/monkins1010/ccminer/releases/tag/v3.3CPU \nnheqminer\nhttps://github.com/VerusCoin/nheqminer/releases`;
            nvidiaGpuMiners = `CCminer\nhttps://github.com/monkins1010/ccminer/releases`;
            amdGpuMiners = `Coming Soon! Please stay tuned!`;
            guiWallet = `Agama\nhttps://github.com/VerusCoin/Agama/releases`;
            cliWallet = `VerusCoin\nhttps://github.com/VerusCoin/VerusCoin/releases`;
        } else if (args[0] == "web") {
            title = "Webchain";
            cpuMiners = `*0% Dev Fee* Courtesty of LOUD Mining\nPre-Compiled - https://webcn.loudmining.com/#/downloads \nSource Code - https://github.com/LOUD-Mining/webchain-miner \nWebchain-miner\nDevelopers Github - https://github.com/webchain-network/webchain-miner`;
            nvidiaGpuMiners = `xm-rig\nPre-Compiled\nhttps://webcn.loudmining.com/#/downloads \nSource Code\nhttps://github.com/monkins1010/Webchain-nvidia-opensource`;
            amdGpuMiners = `xm-rig\nhttps://github.com/monkins1010/AMDWEBCHAIN-AMD/releases \nxmr-stak\nhttps://github.com/monkins1010/LOUD-Webchain-xmr-stak-AMD/releases`;
            guiWallet = `webchain-wallet\nhttps://github.com/webchain-network/webchain-wallet/releases`;
            cliWallet = `webchaind\nhttps://github.com/webchain-network/webchaind/releases`;
        } else if (args[0] !== "web") { 
            if (args[0] !== "vrsc") {
                return message.reply("Quit messin around :rolling_eyes:")
            }
            return;
        }
        let softwareEmbed = new Discord.RichEmbed()
        .setTitle(title)
        .setColor("#00720D")
        .setThumbnail(URL = "https://loudmining.com/images/loudog.png")
        .addField("GUI-Wallet", guiWallet)
        .addField("CLI-Wallet", cliWallet)
        .addField("CPU Miners", cpuMiners)
        .addField("GPU Miners", "------------")
        .addField("AMD", amdGpuMiners)
        .addField("NVidia",nvidiaGpuMiners)
        .addField("Powered by © LOUD Mining 2018", loudFoot.footer);
        return message.channel.send(softwareEmbed);
    }
    message.channel.bulkDelete(1);
    bot.channels.get("515029051518353419").send(`${message.author} Please command me here!`);
    return;
}
module.exports.help = {
    name: "software"
}
