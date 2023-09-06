const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, RoleSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('duyuru')
		.setDescription('Belirli kişilere veya rollere sahip üyelere DM gönderir.')
        .setDMPermission(false)
        .addMentionableOption(option => {
            return option
                .setMulti()
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        let client = interaction.client
        let data = await client.database.fetch(interaction.guild);
        
	}
};