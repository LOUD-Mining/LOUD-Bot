const loudFoot = require("./configs/footer.json");
const webapi = "https://webcn.loudmining.com/api/stats";
const vrscapi = "https://vrsc.loudmining.com/api/stats";
const lmbrapi = "https://lmbr.loudmining.com/api/stats";
const Discord = require("discord.js");
const fetch = require("node-superfetch");
var webMinersTotal;
var webphr;
var webTotalBlocks;
var webphs;
var vrscHashrate;
var vrscTotalBlocks;
var vrscTotalWorkers;
var lmbrHashrate;
var lmbrTotalBlocks;
var lmbrTotalWorkers;
module.exports.run = async (bot, message, args) => {
    var check = message.channel.id;
    var correct = "537913904005775361"
    if(check == correct || message.channel.type == "dm") {
    fetch.get(webapi).then(r => {
        webbody = r.body;
        webphr = webbody.hashrate;
        webTotalBlocks = (webbody.immatureTotal + webbody.maturedTotal);
        webMinersTotal = webbody.minersTotal;
        if (webphr < 1e3) {
            webphs = 'H/s';
        }	else if ((webphr >= 1e3) && (webphr < 1e6)) {
            webphs = 'KH/s';
            webphr = webphr / 1e3;
        }	else if ((webphr >= 1e6) && (webphr < 1e9)) {
            webphs = 'MH/s';
            webphr = webphr / 1e6;
        }
        webphr = ((webphr * 100) / 100).toFixed(3);
        fetch.get(vrscapi).then(rv => {
            vrscbody = rv.body;
            vrscTotalBlocks = (vrscbody.pools.verus.blocks.pending + vrscbody.pools.verus.blocks.confirmed);
            vrscTotalWorkers = vrscbody.global.workers;
            vrscHashrate = vrscbody.algos.verushash.hashrateString;
            fetch.get(lmbrapi).then(rl => {
            lmbrbody = rl.body;
            lmbrTotalBlocks = (lmbrbody.pools.lumber.blocks.pending + lmbrbody.pools.lumber.blocks.confirmed);
            lmbrTotalWorkers = lmbrbody.global.workers;
            lmbrHashrate = lmbrbody.algos.verushash.hashrateString;
        var poolsEmbed = new Discord.RichEmbed()
        .setTitle("LOUD Mining Pool Stats")
        .setColor("#00720D")
        .setThumbnail(URL = "https://loudmining.com/images/loudog.png")
        .addField("Lumber", `Total Workers: ${lmbrTotalWorkers}\nPool Hashrate: ${lmbrHashrate}\nBlocks Found: ${lmbrTotalBlocks}`)
        .addField("VerusCoin", `Total Workers: ${vrscTotalWorkers}\nPool Hashrate: ${vrscHashrate}\nBlocks Found: ${vrscTotalBlocks}`)
        .addField("Webchain", `Total Miners: ${webMinersTotal}\nPool Hashrate: ${webphr} ${webphs}\nBlocksFound: ${webTotalBlocks}`)
        .addField("Powered by © LOUD Mining 2018", (loudFoot.footer));
        return message.channel.send(poolsEmbed);
        })})
    });
    return}
	message.channel.bulkDelete(1);
    bot.channels.get("515029051518353419").send(`${message.author} Please command me here!`);
}
module.exports.help = {
    name: "pools"
}
