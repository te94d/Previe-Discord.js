const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
const { PythonShell } = require('python-shell');

const BASE_PATH = `https://www.youtube.com/watch?v=`;
const youtubeId = `VxR_BYPG7v4`;
const url = BASE_PATH+youtubeId;

module.exports = {
  data: new SlashCommandBuilder()
  .setName("mp4")
  .setDescription("Download SNS-Platform videos")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  execute(interaction){
    
    var pyshell = new PythonShell('./src/Commands/Public/py/sample.py');  
    pyshell.send(url);
    pyshell.on('message', function (data) {
      console.log(data);
    });

    interaction.reply({content: "OK", ephemeral: true}) // ephemeral means only visible for yourself
  },
};