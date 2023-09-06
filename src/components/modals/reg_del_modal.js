const { EmbedBuilder } = require("discord.js");

module.exports = {
    data:{
        name: "reg_del_modal"
    },
    async execute(interaction){
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);
        let userInfo = data.registerRequested.find(r => r.messageID === interaction.message.id);

        
        if(!userInfo){
            await interaction.reply({content:"Bu üye tarafından gönderilen bir talep bulamadım.", ephemeral:true})
            return
        } 
        let member = interaction.guild.members.cache.get(userInfo.id);

        let embed = new EmbedBuilder()
                    .setTitle("Kayıt Talebin Reddedildi")
                    .setThumbnail(interaction.guild.bannerURL())
                    .setFooter({iconURL:interaction.guild.iconURL(), text: interaction.guild.name})
                    .addFields(
                        { name: "Yetkili:", value: interaction.member.nickname ?? interaction.user.username, inline: false },
                        { name: "Sebep:", value: interaction.fields.getTextInputValue('reg_del_modal_reason'), inline: true }
                      );

        //db old request erease
        let indexNum = data.registerRequested.indexOf(data.registerRequested.find(r => r.id === userInfo.id));
        let updateArray = data.registerRequested
        updateArray.splice(indexNum, 1);
        await client.database.update(interaction.guild, {registerRequested: updateArray})

        //messages
        let temp = "";
        await member.send({embeds:[embed]}).catch(error => {
            if(error.code === 50007){
                temp = `<@${member.id}> adlı kullanıcıya mesaj gönderme yetkim yok.`
            }
        });
        await interaction.reply({embeds:[client.embed("Talep Başarıyla Silindi", "Kullanıcı yeni bir kayıt açabilir..." + "\n" +temp)], ephemeral:true});

        await interaction.message.delete();
    }
}