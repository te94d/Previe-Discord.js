const {EmbedBuilder, SlashCommandBuilder, CommandInteraction} = require("discord.js");
const fs = require('fs');
const { userInfo } = require("os");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("format")
  .setDescription("formatについて"), //Download SNS-Platform videos

  async execute(interaction, client){
    const {channel, options} = interaction;

    const mpEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
    .setTitle('format')
    .setDescription('ダウンロードに関するformatについて')
    .addFields(
      { name: ':film_frames: video format', value: '`Best` - 高品質で映像と音声が含まれる\n`Low` - 中品質で映像と音声が含まれる\n`High*` - 最高品質だが**映像のみ**\n※YouTubeでは1080pを超えると映像と音声は別々に保存されている。目安として`Best`が720p，`Low`が360p，`High*`が1080p\n', inline: false },
      { name: ':musical_score: video format', value: '`High` - 最高品質の音声\n`Middle` - 高品質の音声\n`Low` - 中品質の音声\n', inline: false },
    )
    .setColor(0x7B68EE)
    .setTimestamp()
    .setFooter({ text: 'Info Video' });

    interaction.reply({embeds: [mpEmbed], ephemeral: false}) // ephemeral means only visible for yourself
  },
};