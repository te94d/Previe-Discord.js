const discord = require("discord.js");
const client = new discord.Client();
const prefix = "%%";
const fs = require("fs");
let command_int = 0
for (const file of commandFiles) {
	command_int++;
	const command = require(`./command/${file}`);
	console.log(`${file} がロードされました。`)
	client.commands.set(command.name, command);
}
console.log(`合計${command_int}個がロードされました。`)

client.on("message", async message => {
	if (message.content.indexOf(prefix) !== 0) return;
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g); 
	const command = args.shift().toLowerCase(); //引数
	//↓command.jsの指定 'command'については以下に詳しく
  client.commands.get('command').execute(client,command,args,message);
})