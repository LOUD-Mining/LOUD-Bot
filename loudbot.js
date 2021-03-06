const config = require("./configs/config.json"),
 token = require("./configs/token.json"),
 Discord = require("discord.js"),
 fs = require("fs"),
 bot = new Discord.Client(),
 channelID = config.configs.chID

// create a new Discord Collection for the list of command files
bot.commands = new Discord.Collection()
// populate that collection with commands from files
fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err)
	let jsfile = files.filter(f => f.split(".").pop() == "js")
	if(jsfile.length <= 0) {
		console.log("Couldn't find any valid commands!")
		return
	}

	jsfile.forEach((f,i) => {
		let props = require(`./commands/${f}`)
		console.log(`${f} loaded!`)
		bot.commands.set(props.help.name, props)
	})

})

// when bot is fully initialized we announce that the bot is fully operational
try {
bot.on("ready", function() {
	console.log(`Awww Shit! Here come's that asshole ${bot.user.tag}`)
  bot.user.setActivity("with people's emotions")
});
}
catch {
	catchErr(err, message)
}

// bot looks at messages in server and determines if it is a command or not and then runs said command
try {
bot.on("message", async message => {
	
	if(message.author.bot) return
	if(message.author.bot.channelType == "dm") return
	prefix = config.configs.prefix
	messageArray = message.content.split(" ")
  cmd = messageArray[0]
  cmdPrefix = messageArray[0].charAt(0)
	args = messageArray.slice(1)
	if (cmdPrefix != prefix) return
	commandfile = bot.commands.get(cmd.slice(prefix.length))
  if(commandfile) message.channel.startTyping(2).then(commandfile.run(bot,message,args))
  message.channel.stopTyping(true)
})

// logs the bot into discord, make sure to edit the token.json with your own discord oauth token!
bot.login(token.discord)
}
catch{
	catchErr(err)
}
