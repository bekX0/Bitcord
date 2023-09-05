const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data:{
        name: "reg_del"
    },
    async execute(interaction){
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);

        //Is user has registerer role?
        let check = false;
        for (let role of data.registererRoles){
            if(interaction.member.roles.cache.has(role)){
                check = true;
                break;
            }
        }
        if(!check){
            await interaction.editReply({embeds:[client.embed("Hata!", "Görünüşe göre kayıt yetkilisi değilsin.")]});
            return;
        };
        let userInfo = data.registerRequested.find(r => r.messageID === interaction.message.id);
        if(!userInfo){
            await interaction.editReply({content:"Bu üye tarafından gönderilen bir talep bulamadım.", ephemeral:true})
            return
        }

        // code
        let modal = new ModalBuilder()
                    .setTitle("Talebi Kapat")
                    .setCustomId("reg_del_modal")

        let input = new TextInputBuilder()
                    .setCustomId("reg_del_modal_reason")
                    .setLabel("Talebin silinme sebebini yazın.")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMaxLength(200)
        
        let row = new ActionRowBuilder().addComponents(input);
        modal.addComponents(row);

        await interaction.showModal(modal);
    }
}