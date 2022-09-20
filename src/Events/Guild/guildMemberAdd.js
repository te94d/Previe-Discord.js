const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed} = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  execute(member){
    const {user, guild} = member;
    const welcomeChannel = member.guild.channels.cache.get('1021873747998822523');
    const welcomeMessage = `Welcome <@${member.id}> to the server`;
    const memberRole = '1021876056862490764';

    const welcomeEmbed = new EmbedBuilder()
    .setTitle("**New member!**")
    .setDescription(welcomeMessage)
    .setColor(0x037821)
    .addFields({name:'Total members', value: `${guild.memberCount}`})
    .setTimestamp();

    welcomeChannel.send({embeds: [welcomeEmbed]});
    member.roles.add(memberRole);
  }
}