module.exports = {
    data:{
        name: "autorole_switch"
    },
    async execute(interaction){
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);

        if(data.autoRoleList.length === 0){
            await interaction.reply({embeds:[client.embed('Hata!', 'Roller ayarlanmamış!')]});
            return;
            }

        if(!data.autoRoleStatus){
            await client.database.update(interaction.guild.id, {autoRoleStatus: true});
            await interaction.reply({embeds:[client.embed('Başarılı!', 'Otorol Aktifleştirildi!')], ephemeral:true})

        }else{
            await client.database.update(interaction.guild.id, {autoRoleStatus: false});
            await interaction.reply({embeds:[client.embed('Başarılı!', 'Otorol Kapatıldı!')], ephemeral:true})
        }
    }
}