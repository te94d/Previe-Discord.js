const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require("../../../config.json")

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {

    console.log(`${client.user.username} is now online.`);

    client.user.setPresence({
			activities: [{ name: `/help `, type: ActivityType.Playing }],
		});
  },
};