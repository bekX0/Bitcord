module.exports = {
    data:{
        name:"autorole"
    },
    async execute(interaction) {
        let client = interaction.client;
        await client.database.update(interaction.guild, {autoRoleList: interaction.values});
        await interaction.reply({content:"Başarılı!", ephemeral:true});
        //! süresi biten sunucularda kesinti yapmıyor!
    }
}