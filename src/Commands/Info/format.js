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
    .setTitle(':newspaper: formatについて')
    .setDescription('**仕様**\nYouTubeでは1080pを超えると映像と音声は別々に保存されている。`High*`を選択されると動画の最高画質のものがダウンロードされるので音声が入らない場合があります。\n**1080p+Audioは実装予定**')
    .addFields(
      { name: ':film_frames: video format', value: '`Best` - 720p+Audio\n`Low` - 360p+Audio\n`High*` - 1080p以上+NoAudio\n', inline: false },
      { name: ':musical_score: video format', value: '`High` - 最高品質の音声\n`Middle` - 高品質の音声\n`Low` - 中品質の音声\n', inline: false },
    )
    .setColor(0x7B68EE)
    .setTimestamp()
    .setFooter({ text: 'Info Format' });

    interaction.reply({embeds: [mpEmbed], ephemeral: false}) // ephemeral means only visible for yourself
  },
};