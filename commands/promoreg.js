const loudFoot = require("./configs/footer.json");
const Discord = require("discord.js");
const mysql = require("mysql");
module.exports.run = async (bot, message, args) => {
    let check = message.channel.id;
    let correct = "537913904005775361";
    if(message.channel.type == "dm") return message.channel.send("Sorry can't do that here!");
    if(check == correct) {
        if((!args[0]) || (args[0] != "vrsc" )) return message.channel.send(`Please supply a valid network and wallet address!\n\nExample: .promoreg vrsc RYUF25iNGUyXhyXj9Nz2aM1N1RhAdNW56X`);
        if((!args[1])) return message.channel.send(`Please supply a valid wallet address!\n\nExample: .promoreg vrsc RYUF25iNGUyXhyXj9Nz2aM1N1RhAdNW56X`);
        let tag = message.author.tag;
        let uid = message.author.id;
        let username = message.author.username;
        let network = args[0];
        let waladd = args[1];
        let tenure = message.createdAt;
        const connection = mysql.createConnection({host: "localhost", user: "username", password: "password", database: "databasename"});
        connection.query(`select * from promo where wallet = ("${waladd}")`, (err, waldata) => {
            if (err) return console.log(err);
            if (waldata < 1) return;
            if (waldata[0].wallet = args[1]) {
                let promoRegDupeWalletEmbed = new Discord.RichEmbed()
                .setColor("#00720D")
                .setThumbnail(URL = "https://loudmining.com/images/loudog.png")
                .addField("OOps! You might have entered the wrong address...  Are you trying to cheat?!?", `You already registered on ${waldata[0].tenure}! Thanks for your support!`)
                .addField("Powered by © LOUD Mining 2018", (loudFoot.footer));
                return message.channel.send(promoRegDupeWalletEmbed);
            }
        });
        connection.query(`select * from promo where userid = ("${uid}")`,  (err, database) => {
            if(err) return console.log(err);
            if(database < 1 ) {
                connection.query(`insert into promo (userid, username, network, wallet, registered, tenure) values ("${uid}", "${username}", "${network}", "${waladd}", "true", "${tenure}")`);
                let promoRegSuccessEmbed = new Discord.RichEmbed()
                .setColor("#00720D")
                .setThumbnail(URL = "https://loudmining.com/images/loudog.png")
                .addField("February Promotion Registration Successful!", "Keep your workers hashing on vrsc.loudmining.com throughout February to ensure your entry!")
                .addField("Powered by © LOUD Mining 2018", (loudFoot.footer));
                return message.channel.send(promoRegSuccessEmbed);
            }
        });
    return;}
    message.channel.bulkDelete(1);
    bot.channels.get("537913904005775361").send(`${message.author} Please command me here or in a DM thanks!`);
    return;
}
module.exports.help = {
    name: "promoreg"
}
