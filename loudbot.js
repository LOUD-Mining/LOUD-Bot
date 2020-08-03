const config = require("./configs/config.json")
const tokenFile = require("./configs/token.json")
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() == "js")
	if(jsfile.length <= 0) {
		console.log("Couldn't find any valid commands!");
		return;
	}
	jsfile.forEach((f,i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});
bot.on("ready", function() {
	console.log(`Awww Shit! Here come's that asshole ${bot.user.tag}`);
	bot.user.setStatus("LOUDest pool on the BLOCK!");
	console.error();
});
bot.on("message", async message => {
	prefix = config.prefix;
	if(message.author.bot) return;
	if(message.author.bot == "dm") return;
	if(message.content.charAt(0) = prefix) {
		messageArray = message.content.charAt(1).split(" ");
		cmd = messageArray[0];
		args = messageArray.slice(1);
		commandfile = bot.commands.get(cmd);
		if(commandfile) commandfile.run(bot,message,args);
	} console.error();
});
bot.login(tokenFile.token);