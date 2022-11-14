const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, CommandInteraction} = require("discord.js");
const fs = require('fs');
const { userInfo } = require("os");
const { PythonShell } = require('python-shell');
const ytdl = require('ytdl-core');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("allv")
  .setDescription("この世の全動画をダウンロード") //Download SNS-Platform videos
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addStringOption(option =>
    option.setName("url")
    .setDescription("url") //Enter your youtube id.
    .setRequired(true)
  ),
  async execute(interaction, client){
    const {channel, options} = interaction;
    const url = options.getString("url");

    const mpEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
    .setTitle("DLするやつ")
    .setURL(url)
    .addFields(
      { name: 'state', value: '📥 ダウンロードを開始します', inline: false },
    )
    .setTimestamp()
    .setFooter({ text: 'Save Video' })
    .setColor(0x8ED1E0);

    const finishedEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
    .setTitle("DLしたやつ")
    .setURL(url)
    .addFields(
      { name: 'state', value: '🟩 ダウンロードを完了しました', inline: false },
    )
    .setTimestamp()
    .setFooter({ text: 'Save Video' })
    .setColor(0x8ED1E0);

    const unfinishedEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
    .setTitle("DLしようとしたやつ")
    .setURL(url)
    .addFields(
      { name: 'state', value: '🟥 ダウンロードを中止しました', inline: false },
    )
    .setTimestamp()
    .setFooter({ text: 'Save Video' })
    .setColor(0x8ED1E0);

    let flag;
    let pyshell = new PythonShell('./src/Commands/General/py/ytdlp-video.py');  
    pyshell.send(url);
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
  },
};