module.exports = {
    data:{
        name:"reg_roles_menu_registerer"
    },
    async execute(interaction) {
        let client = interaction.client;
        await client.database.update(interaction.guild, {registererRoles: interaction.values});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}