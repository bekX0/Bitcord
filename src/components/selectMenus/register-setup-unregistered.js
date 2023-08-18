module.exports = {
    data:{
        name:"reg_roles_menu_unregistered"
    },
    async execute(interaction) {
        let client = interaction.client;
        await client.database.update(interaction.guild, {unregisteredRole: interaction.values[0]});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}