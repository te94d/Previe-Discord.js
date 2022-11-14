const { SlashCommandBuilder, MessageActivityType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("reactor")
  .setDescription("開発中-respond to a reaction")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "React hera",
      fetchReply: true,
    });

    message.react('👍');

    const filter = (reaction, user) => {
      return reaction.emoji.name === '👍' && user.id === message.author.id;
    };
    
    const collector = message.createReactionCollector({ filter, time: 8000 });
    
    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });
    
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};