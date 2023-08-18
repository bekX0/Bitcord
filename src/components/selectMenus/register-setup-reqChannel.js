module.exports = {
    data:{
        name:"reg_channels_menu_req"
    },
    async execute(interaction) {
        let client = interaction.client;
        await client.database.update(interaction.guild, {regRequestChannel: interaction.values[0]});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}