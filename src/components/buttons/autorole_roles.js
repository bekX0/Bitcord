const { RoleSelectMenuBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
    data:{
        name: "autorole_roles"
    },
    async execute(interaction){
        let data = await interaction.client.database.fetch(interaction.guild)
        let max = data.guildLevel === 0 ? 1 : data.guildLevel === 1 ? 3 : 10;
        let menu = new RoleSelectMenuBuilder()
                    .setCustomId('autorole')
                    .setMaxValues(max)
                    .setPlaceholder(`En fazla ${max} rol seçebilirsin.`)
                    .setMinValues(1);
        let row = new ActionRowBuilder().addComponents(menu);
        await interaction.reply({components:[row], ephemeral:true})
    }
}