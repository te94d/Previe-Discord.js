const {EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
const { userInfo } = require("os");
const ytdl = require('ytdl-core');

const BASE_PATH = `https://www.youtube.com/watch?v=`;

module.exports = {
  data: new SlashCommandBuilder()
  .setName("info")
  .setDescription("動画を情報を表示") //Download SNS-Platform videos
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
      const ch = info.videoDetails.ownerChannelName;
      const views = info.videoDetails.viewCount;
      const likes = info.videoDetails.likes;
      const category = info.videoDetails.category;
      const uploadDate = info.videoDetails.uploadDate;

      const thumbnail = 'https://i.ytimg.com/vi/' + youtubeId + '/maxresdefault.jpg';

      const mpEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
      .setTitle('Contents Information')
      .setDescription('コンテンツ関連の情報')
      .addFields(
        { name: ':dizzy: Title', value: '```' + title + '```', inline: false },
        { name: ':bell: Channel', value: '```' + ch + '```', inline: false },
        { name: ':eyes: Views', value: '```' + views + '```', inline: true },
        { name: ':thumbsup: Likes', value: '```' + likes + '```', inline: true },
        { name: ':label: Category', value: '```' + category + '```', inline: false },
        { name: ':date: Upload Date', value: '```' + uploadDate + '```', inline: false },
        { name: ':link: URL', value: '' + url + '', inline: false },
      )
      .setImage(thumbnail)
      .setColor(0xffd700)
      .setTimestamp()
      .setFooter({ text: 'Info Video' });

      interaction.reply({embeds: [mpEmbed], ephemeral: false}) // ephemeral means only visible for yourself
    });
  },
};