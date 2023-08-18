module.exports = {
    data:{
        name:"reg_roles_menu_registered"
    },
    async execute(interaction) {
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);
        let obj = {reg: interaction.values[0], male: data.registeredRoles.male, female: data.registeredRoles.female}
        await client.database.update(interaction.guild, {registeredRoles: obj});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}