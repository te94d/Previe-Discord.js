const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
module.exports = {
  name:"command",
  description: 'main',
  async execute(client,command,args,message){
    if (command == "test1"){
      client.commands.set('test1').execute(client,command,args,message)
    }
    if (command == "test2"){
      client.commands.set('test2').execute(client,command,args,message)
    }
  }
}