const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setDMPermission(false),
	async execute(interaction) {
		//let reply = await interaction.reply({content:`${interaction.client.emoji.get('dance')}`, fetchReply:true}).then(msg => msg.react('1140578373010194503'));
		// console.log(interaction)
		// await interaction.reply({content: '<@&1140613988401557504>'})
	}
};