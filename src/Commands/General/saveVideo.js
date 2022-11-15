const {EmbedBuilder, SlashCommandBuilder, CommandInteraction} = require("discord.js");
const fs = require('fs');
const { userInfo } = require("os");
const { PythonShell } = require('python-shell');
const ytdl = require('ytdl-core');

const BASE_PATH = `https://www.youtube.com/watch?v=`;

module.exports = {
  data: new SlashCommandBuilder()
  .setName("video")
  .setDescription("YouTubeの動画をダウンロード") //Download SNS-Platform videos
  .addStringOption(option =>
    option.setName("format")
      .setDescription("/format で詳細を確認してください。")
      .setRequired(true)
      .addChoices(
        { name: 'Best', value: 'best' },
        { name: 'Low', value: 'best.2' },
        { name: 'High*', value: 'bestvideo' },
  ))
  .addStringOption(option =>
    option.setName("youtube-id")
    .setDescription("動画のID") //Enter your youtube id.
    .setRequired(true)
  ),
  async execute(interaction, client){
    const {channel, options} = interaction;
    const youtubeId = options.getString("youtube-id");
    const url = BASE_PATH+youtubeId;
    const format = interaction.options.getString('format');
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
      //.setDescription(ch)
      .setImage(thumbnail)
      .addFields(
        { name: 'channel', value: ch, inline: false },
        { name: 'format', value: format, inline: false },
        { name: 'state', value: '📥 ダウンロードを開始します', inline: false },
      )
      .setTimestamp()
      .setFooter({ text: 'Save Video' })
      .setColor(0x8ED1E0);

      const finishedEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
      .setTitle(title)
      .setURL(url)
      //.setDescription(ch)
      .setImage(thumbnail)
      .addFields(
        { name: 'channel', value: ch, inline: false },
        { name: 'format', value: format, inline: false },
        { name: 'state', value: '🟩 ダウンロードを完了しました', inline: false },
      )
      .setTimestamp()
      .setFooter({ text: 'Save Video' })
      .setColor(0x8ED1E0);

      const unfinishedEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
      .setTitle(title)
      .setURL(url)
      //.setDescription(ch)
      .setImage(thumbnail)
      .addFields(
        { name: 'channel', value: ch, inline: false },
        { name: 'format', value: format, inline: false },
        { name: 'state', value: '🟥 ダウンロードを中止しました', inline: false },
      )
      .setTimestamp()
      .setFooter({ text: 'Save Video' })
      .setColor(0x8ED1E0);

      let flag;
      const ytdlpPath = './src/Commands/General/py/ytdlp-video.py';
      let options = {
        mode: 'text',
        pythonOption: ['-u'],
        args:[
          '-url', url,
          '-format', format
        ]
      }
      let pyshell = new PythonShell(ytdlpPath, options);  
      pyshell.send();
      pyshell.on('message', function (data) {
        console.log(data);
        if(data.endsWith("finish")) {
          flag = 0;
          console.log("完全に処理が行われました");
          interaction.editReply({embeds: [finishedEmbed], fetchReply: true });
        } else {
          flag = 1;
          console.log("処理が途中で修了しました");
          interaction.editReply({embeds: [unfinishedEmbed], fetchReply: true });
        }
      });

      interaction.reply({embeds: [mpEmbed], ephemeral: false}) // ephemeral means only visible for yourself
    });
  },
};