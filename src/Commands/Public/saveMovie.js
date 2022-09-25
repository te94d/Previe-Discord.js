const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
const { PythonShell } = require('python-shell');

const BASE_PATH = `https://www.youtube.com/watch?v=`;

module.exports = {
  data: new SlashCommandBuilder()
  .setName("mp4")
  .setDescription("YouTubeの動画をダウンロード") //Download SNS-Platform videos
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addStringOption(option =>
    option.setName("youtube-id")
    .setDescription("動画のID") //Enter your youtube id.
    .setRequired(true)
  ),
  async execute(interaction){
    const {channel, options} = interaction;
    const youtubeId = options.getString("youtube-id");
    const url = BASE_PATH+youtubeId;
    var pyshell = new PythonShell('./src/Commands/Public/py/yt-dlp.py');  
    pyshell.send(url);
    pyshell.on('message', function (data) {
      console.log(data);
    });

    interaction.reply({content: "OK", ephemeral: true}) // ephemeral means only visible for yourself
  },
};