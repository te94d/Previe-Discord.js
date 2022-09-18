const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
module.exports = {
  name:"test2",
  description: 'test2',
  async execute(client,command,args,message){
    message.channels.send('外部ファイルで処理')
  }
}