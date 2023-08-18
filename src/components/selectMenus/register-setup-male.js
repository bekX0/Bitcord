module.exports = {
    data:{
        name:"reg_roles_menu_male"
    },
    async execute(interaction) {
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);
        let obj = {reg: data.registeredRoles.reg, male: interaction.values[0], female: data.registeredRoles.female}
        await client.database.update(interaction.guild, {registeredRoles: obj});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}