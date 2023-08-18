module.exports = {
    data:{
        name:"reg_roles_menu_female"
    },
    async execute(interaction) {
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);
        let obj = {reg: data.registeredRoles.reg, male: data.registeredRoles.male, female: interaction.values[0]}
        await client.database.update(interaction.guild, {registeredRoles: obj});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}