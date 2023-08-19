const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, RoleSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('otorol')
		.setDescription('Sunucuya yeni katılan üyelerin alacağı rolleri belirler.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        let client = interaction.client
        let data = await client.database.fetch(interaction.guild);
        let emoji = (name) => {return client.emoji.get(name)};

        let embed = new EmbedBuilder()
                    .setTitle('Otorol Sistemi')
                    .addFields(
                        {name:'Otorol Sistemi', value: data.autoRoleStatus ? `${emoji('on')} Açık` : `${emoji('off')} Kapalı`, inline:false},
                        {name:'Roller', value:data.autoRoleList.length === 0 ? 'Yok' : data.autoRoleList.map(role => `<@&${role}>`).join(','), inline:true}
                    )
        let button_switch = new ButtonBuilder().setCustomId('autorole_switch').setLabel('AÇ/KAPAT').setStyle(ButtonStyle.Danger);
        let button_roles = new ButtonBuilder().setCustomId('autorole_roles').setLabel('Rolleri Belirle').setStyle(ButtonStyle.Secondary);
        let row = new ActionRowBuilder().addComponents(button_roles, button_switch);
        await interaction.reply({embeds:[embed], components:[row], ephemeral:true});
	}
};