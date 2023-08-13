const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Sends an help message to message author. It contains command and contact informations.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
        let commands = "";
		interaction.client.globalCommands.map(command => {
            commands += "|-" + command.data.name + ': ' + command.data.description + "\n";
        });
        let embed = new EmbedBuilder()
                    .addFields(
                        {name:"Commands List", value: commands, inline:false},
                    )
        await interaction.reply({embeds: [embed]})
	}
};