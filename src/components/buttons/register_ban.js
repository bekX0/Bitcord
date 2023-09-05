const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data:{
        name: "reg_ban"
    },
    async execute(interaction){
        await interaction.deferReply({ephemeral:true});
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);

        //Is user has registerer role?
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)){
            await interaction.editReply({embeds:[client.embed("Hata!", "Görünüşe göre banlama yetkin yok.")]});
            return;
        };
        let userInfo = data.registerRequested.find(r => r.messageID === interaction.message.id);
        if(!userInfo){
            await interaction.editReply({content:"Bu üye tarafından gönderilen bir talep bulamadım.", ephemeral:true})
            return
        }

        // code
        let member = interaction.guild.members.cache.get(userInfo.id);

        //db old request erease
        let indexNum = data.registerRequested.indexOf(data.registerRequested.find(r => r.id === userInfo.id));
        let updateArray = data.registerRequested
        updateArray.splice(indexNum, 1);
        await client.database.update(interaction.guild, {registerRequested: updateArray})

        await interaction.guild.bans.create(member, {reason: `Kayıt talebi üzerinden banlandı. Yetkili: ${interaction.user.username}`});
        await interaction.editReply({content:"Kullanıcı başarıyla banlandı!", ephemeral:true});
        await interaction.message.delete();
    }
}