const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("updata")
  .setDescription("BOTの状態をアップデート")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand(subcommand =>
    subcommand.setName("activity")
      .setDescription("BOTのアクティビティを更新")
      .addStringOption(option =>
        option.setName("type")
          .setDescription("アクティビティを選択")
          .setRequired(true)
          .addChoices(
            { name: "Playing", value: "Playing" },
            { name: "Streaming", value: "Streaming" },
            { name: "Listening", value: "Listening" },
            { name: "Watching", value: "Watching" },
            { name: "Competing", value: "Competing" },
          )
      )
      .addStringOption(option =>
        option.setName("activity")
          .setDescription("現在のアクティビティを設定")
      )
  )
  .addSubcommand(subcommand =>
    subcommand.setName("status")
      .setDescription("BOTのスタッツを更新")
      .addStringOption(option =>
        option.setName("type")
          .setDescription("スタッツを選択")
          .setRequired(true)
          .addChoices(
            { name: "Online", value: "online" },
            { name: "Idle", value: "idle" },
            { name: "Dnd", value: "dnd" },
            { name: "Invisible", value: "invisible" },
          )
      )
  ),
  async execute(interaction, client) {
    const { options } = interaction;
    const sub = options.getSubcommand(["activity", "status"]);
    const type = options.getString("type");
    const activity = options.getString("activity");

    try {
      switch (sub) {
        case "activity":
          switch (type) {
            case "Playing":
              client.user.setActivity(activity, { type: ActivityType.Playing });
              break;
            case "Streaming":
              client.user.setActivity(activity, { type: ActivityType.Streaming });
              break;
            case "Listening":
              client.user.setActivity(activity, { type: ActivityType.Listening });
              break;
            case "Watching":
              client.user.setActivity(activity, { type: ActivityType.Watching });
              break;
            case "Competing":
              client.user.setActivity(activity, { type: ActivityType.Competing });
              break;
          }
        case "status":
          client.user.setPresence({ status: type });
          break;
      }
    } catch (err) {
      console.log(err);
    }

    const updataEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Previe', iconURL: client.user.displayAvatarURL() })
    .setDescription(`Succesfully updated your ${sub} to **${type}**.`)
    .setTimestamp()
    .setFooter({ text: 'updata' })
    .setColor(0xFFC0CB);

    return interaction.reply({embeds: [updataEmbed], ephemeral: false})
  }
}