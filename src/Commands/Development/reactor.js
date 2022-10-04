const { SlashCommandBuilder, MessageActivityType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("reactor")
  .setDescription("respond to a reaction"),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "React hera",
      fetchReply: true,
    });

    const emoji = client.emojis.cache.find(
      (emoji) => emoji.id == "1025263435149221908"
    );

    message.react(emoji);
    message.react("👍");

    const filter = (reaction, user) => {
      return reaction.emoji.name == "👍" && user.id == interaction.user.id;
    };

    const collector = message.createReactionCollector({ filter, time: 10000 });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};