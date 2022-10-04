const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("help")
  .setDescription("登録されているコマンドを表示"),
  async execute(interaction) {
    const emojis = {
      info: "💬",
      moderation: "🏹",
      general: "⚔",
    };

    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    
    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
      .filter((cmd) => cmd.folder === dir)
      .map((cmd) => {
        return {
          name: cmd.data.name,
          discription: cmd.data.description || "このコマンドに関する説明はありません",
        };
      });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
    .setDescription("ドロップダウンメニューからカテゴリーを選択してください")
    .setColor(0xc0c0c0);

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
        .setCustomId("help-menu")
        .setPlaceholder("Please select a category")
        .setDisabled(state)
        .addOptions(
          categories.map((cmd) => {
            return {
              label: cmd.directory,
              value: cmd.directory.toLowerCase(),
              discription: `Commands from ${cmd.directory} category.`,
              emoji: emojis[cmd.directory.toLowerCase() || null],
            };
          })
        )
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) => 
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SelectMenu,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
      .setTitle(`${formatString(directory)} commands`)
      .setDescription(`${directory} コマンド`)
      .addFields(
        category.commands.map((cmd) => {
          let cmdDiscription = cmd.discription
          return {
            name: `\`${cmd.name}\``,
            value: cmdDiscription,
            inline: false,
          };
        }),
      )
      .setColor(0xc0c0c0);

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};