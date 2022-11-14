const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("確認用-Pong")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  execute(interaction){
    interaction.reply({content: "Pong", ephemeral: true}) // ephemeral means only visible for yourself
  },
};