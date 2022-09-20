require('dotenv').config();
const {token} = process.env;
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});

//起動確認
client.once('ready', () => {
    console.log(`${client.user.tag} Ready`);
});

//返答
client.on('messageCreate', message => {
    if (message.author.bot) {
        return;
    }

    if (message.content == 'hi') {
        message.channel.send('hi!');
    }
});

client.login(token);