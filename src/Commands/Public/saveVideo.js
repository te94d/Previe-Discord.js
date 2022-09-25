const {EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
const { userInfo } = require("os");
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
  async execute(interaction, client){
    const {channel, options} = interaction;
    const youtubeId = options.getString("youtube-id");
    const url = BASE_PATH+youtubeId;

    const mpEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
    .setTitle('取得したタイトル')
    .setURL(url)
    //.setDescription('Click the button to verify your account and get access to the channels.')
    .addFields(
      { name: 'channel', value: '```取得して表示させる```', inline: false },
      { name: 'url', value: '```'+ url +'```', inline: false },
    )
    //.setImage(client.user.displayAvatarURL())
    .setColor(0x8ED1E0)

    var pyshell = new PythonShell('./src/Commands/Public/py/ytdlp-video.py');  
    pyshell.send(url);
    pyshell.on('message', function (data) {
      console.log(data);
    });

    interaction.reply({embeds: [mpEmbed], ephemeral: false}) // ephemeral means only visible for yourself
  },
};