const loudFoot = require("./configs/footer.json");
const webapi = "https://webcn.loudmining.com/api/stats";
const vrscapi = "https://vrsc.loudmining.com/api/stats";
const lmbrapi = "https://lmbr.loudmining.com/api/stats";
const Discord = require("discord.js");
const fetch = require("node-superfetch");
var lmbrdiff;
var lmbrbch;
var lmbrnhr;
var vrscdiff;
var vrscbch;
var vrscnhr;
var webdiff;
var webbch;
var webnhr;
module.exports.run = async (bot, message, args) => {
    var check = message.channel.id;
    var correct = "537913904005775361"
    if(check == correct || message.channel.type == "dm") {
    fetch.get(webapi).then(webr => {
        webbody = webr.body;
        webbch = webbody.nodes[0].height;
        webdiff = webbody.nodes[0].difficulty;
        webnhr = webbody.nodes[0].difficulty / 12;
            if (webdiff < 1e3) {
                webdiffs = 'Hashes';
            }	else if ((webdiff >= 1e3) && (webdiff < 1e6)) {
                webdiffs = 'KiloHashes';
                webdiff = webdiff / 1e3;
            }	else if ((webdiff >= 1e6) && (webdiff < 1e9)) {
                webdiffs = 'MegaHashes';
                webdiff = webdiff / 1e6;
            }	else if ((webdiff >= 1e9) && (webdiff < 1e12)) {
                webdiffs = 'GigaHashes';
                webdiff = webdiff / 1e9;
            }
            if (webnhr < 1e3) {
                webnhs = 'H/s';
            } 	else if ((webnhr >= 1e3) && (webnhr < 1e6)) {
                webnhs = 'KH/s';
                webnhr = webnhr / 1e3;
            } 	else if ((webnhr >= 1e6) && (webnhr < 1e9)) {
                webnhs = 'MH/s';
                webnhr = webnhr / 1e6;
            }
            webdiff = (webdiff).toFixed(3);
            webnhr = (webnhr).toFixed(3);
            fetch.get(lmbrapi).then(lmbr => {
                lmbrbody = lmbr.body;
                lmbrbch = lmbrbody.pools.lumber.poolStats.networkBlocks;
                lmbrnhr = lmbrbody.pools.lumber.poolStats.networkSolsString;
                lmbrdiff = lmbrbody.pools.lumber.poolStats.networkDiff;
                if (lmbrdiff < 1e3) {
                    lmbrdiffs = 'Hashes';
                }	else if ((lmbrdiff >= 1e3) && (lmbrdiff < 1e6)) {
                    lmbrdiffs = 'KiloHashes';
                    lmbrdiff = lmbrdiff / 1e3;
                }	else if ((lmbrdiff >= 1e6) && (lmbrdiff < 1e9)) {
                    lmbrdiffs = 'MegaHashes';
                    lmbrdiff = lmbrdiff / 1e6;
                }	else if ((lmbrdiff >= 1e9) && (lmbrdiff < 1e12)) {
                    lmbrdiffs = 'GigaHashes';
                    lmbrdiff = lmbrdiff / 1e9;
                }   else if ((lmbrdiff >= 1e12) && (lmbrdiff < 1e15)) {
                    lmbrdiffs = 'TeraHashes';
                    lmbrdiff = lmbrdiff / 1e12;
                }   else if ((lmbrdiff >= 1e15) && (lmbrdiff < 1e18)) {
                    lmbrdiffs = 'PetaHashes';
                    lmbrdiff = lmbrdiff / 1e15;
                }   else if ((lmbrdiff >= 1e18) && (lmbrdiff < 1e21)) {
                    lmbrdiffs = 'ExaHashes';
                    lmbrdiff = lmbrdiff / 1e18;
                }   else if ((lmbrdiff >= 1e21) && (lmbrdiff < 1e24)) {
                    lmbrdiffs = 'ZetaHashes';
                    lmbrdiff = lmbrdiff / 1e21;
                }
                lmbrdiff = (lmbrdiff).toFixed(3);
                fetch.get(vrscapi).then(vrscr => {
                    vrscbody = vrscr.body;
                    vrscbch = vrscbody.pools.verus.poolStats.networkBlocks;
                    vrscnhr = vrscbody.pools.verus.poolStats.networkSolsString;
                    vrscdiff = vrscbody.pools.verus.poolStats.networkDiff;
                    if (vrscdiff < 1e3) {
                        vrscdiffs = 'Hashes';
                    }	else if ((vrscdiff >= 1e3) && (vrscdiff < 1e6)) {
                        vrscdiffs = 'KiloHashes';
                        vrscdiff = vrscdiff / 1e3;
                    }	else if ((vrscdiff >= 1e6) && (vrscdiff < 1e9)) {
                        vrscdiffs = 'MegaHashes';
                        vrscdiff = vrscdiff / 1e6;
                    }	else if ((vrscdiff >= 1e9) && (vrscdiff < 1e12)) {
                        vrscdiffs = 'GigaHashes';
                        vrscdiff = vrscdiff / 1e9;
                    }   else if ((vrscdiff >= 1e12) && (vrscdiff < 1e15)) {
                        vrscdiffs = 'TeraHashes';
                        vrscdiff = vrscdiff / 1e12;
                    }   else if ((vrscdiff >= 1e15) && (vrscdiff < 1e18)) {
                        vrscdiffs = 'PetaHashes';
                        vrscdiff = vrscdiff / 1e15;
                    }   else if ((vrscdiff >= 1e18) && (vrscdiff < 1e21)) {
                        vrscdiffs = 'ExaHashes';
                        vrscdiff = vrscdiff / 1e18;
                    }   else if ((vrscdiff >= 1e21) && (vrscdiff < 1e24)) {
                        vrscdiffs = 'ZetaHashes';
                        vrscdiff = vrscdiff / 1e21;
                    }
                    vrscdiff = (vrscdiff).toFixed(3);
                    networkEmbed = new Discord.RichEmbed()
                    .setTitle("Network Stats")
                    .setColor("#00720D")
                    .setThumbnail(URL = "https://loudmining.com/images/loudog.png")
                    .addField("Lumber Network Status", `Blockchain Height: ${lmbrbch}\nNetwork Difficulty: ${lmbrdiff} ${lmbrdiffs}\nNetwork Hashrate: ${lmbrnhr}`)
                    .addField("VerusCoin Network Status", `Blockchain Height: ${vrscbch}\nNetwork Difficulty: ${vrscdiff} ${vrscdiffs}\nNetwork Hashrate: ${vrscnhr}`)
                    .addField("Webchain Network Status", `Blockchain Height: ${webbch}\nNetwork Difficulty: ${webdiff} ${webdiffs}\nNetwork Hashrate: ${webnhr} ${webnhs}`)
                    .addField("Powered by © LOUD Mining 2018", (loudFoot.footer));
                    return message.channel.send(networkEmbed);
    });});});return}
	message.channel.bulkDelete(1);
    bot.channels.get("515029051518353419").send(`${message.author} Please command me here!`);
}
module.exports.help = {
    name: "network"}