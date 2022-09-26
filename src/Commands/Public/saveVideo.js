const {EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
const { userInfo } = require("os");
const { PythonShell } = require('python-shell');
const ytdl = require('ytdl-core');

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
  async execute(interaction, client){
    const {channel, options} = interaction;
    const youtubeId = options.getString("youtube-id");
    const url = BASE_PATH+youtubeId;

    ytdl.getInfo(youtubeId).then(info => {
      //console.log('動画info:', info.videoDetails);
      const title = info.videoDetails.title;
      console.log('[ title ]\n', title);
      const ch = info.videoDetails.ownerChannelName;
      console.log('[ channel ]\n', ch);
      const thumbnail = 'https://i.ytimg.com/vi/' + youtubeId + '/maxresdefault.jpg';

      const mpEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
      .setTitle(title)
      .setURL(url)
      .setDescription(ch)
      .setImage(thumbnail)
      .setColor(0x8ED1E0)
      .setTimestamp()
      .setFooter({ text: 'Save Video' });
      
      /*let pyshell = new PythonShell('./src/Commands/Public/py/ytdlp-video.py');  
      pyshell.send(url);
      pyshell.on('message', function (data) {
        console.log(data);
      });*/

      interaction.reply({embeds: [mpEmbed], ephemeral: false}) // ephemeral means only visible for yourself
    });
  },
};