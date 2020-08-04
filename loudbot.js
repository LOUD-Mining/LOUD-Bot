const config = require("./configs/config.json")
const tokenFile = require("./configs/token.json")
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

function catchErr(err) {
	bot.users.get(config.configs.adminUser).send(config.configs.errMsg);
	bot.users.get(config.configs.adminUser).send("Error contained below: \n```" + err + "```");
}

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
try {
bot.on("ready", function() {
	console.log(`Awww Shit! Here come's that asshole ${bot.user.tag}`);
	bot.user.setStatus("LOUDest pool on the BLOCK!");
});
}
catch {
	catchErr(err, message);
}
try {
bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.author.bot.channelType == "dm") return;
	prefix = config.configs.prefix;
	messageArray = message.content.split(" ");
	cmd = messageArray[0];
	args = messageArray.slice(1);
	if (message.content.charAt(0) != prefix) return;
	commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);
});
bot.login(tokenFile.token);
}
catch{
	catchErr(err);
}