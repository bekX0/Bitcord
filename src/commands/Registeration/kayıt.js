const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
            .setName('kayıt')
            .setDescription('Kayıtsız bir kullanıcının kayıt talebi göndermesini sağlar.')
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction){
        let client = interaction.client;
        //check if guild opened the register system...
        let guildDB = await client.database.fetch(interaction.guild.id);
        if(!guildDB.registerSysyemStatus){
            await interaction.reply({embeds:[client.embed("Hata!", "Kayıt sistemi sunucunda aktif durumda değil.\nLütfen bir yetkiliyle iletişime geç!")]})
            return;
        }

        
    }
}