const { EmbedBuilder } = require("discord.js");

module.exports = {
    data:{
        name: "reg_f"
    },
    async execute(interaction){
        await interaction.deferReply({ephemeral:true});
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

        await interaction.guild.members.fetch();
        let member = interaction.guild.members.cache.get(userInfo.id);    
        //db old request erease
        let indexNum = data.registerRequested.indexOf(data.registerRequested.find(r => r.id === userInfo.id));
        let updateArray = data.registerRequested
        updateArray.splice(indexNum, 1);
        await client.database.update(interaction.guild, {registerRequested: updateArray})

        try {
            await member.roles.add([data.registeredRoles.female, data.registeredRoles.reg]);
            await member.roles.remove(data.unregisteredRole);
            await member.setNickname(`${userInfo.name} » ${userInfo.age}`);
        } catch (error) {
            console.log(error)
            console.log("register_female error")
            await interaction.editReply({content:"Botun rolünü üste taşır mısın :(", ephemeral:true})
            return
        }
        
        //log register
        let channel = interaction.guild.channels.cache.get(data.regLogChannel);
        let embed = new EmbedBuilder()
                    .setTitle('Yeni Kayıt')
                    .addFields(
                        {name:"Kayıt Yetkilisi", value:`<@${interaction.member.id}>`, inline:true},
                        {name:"Üye:", value:`<@${userInfo.id}>`, inline:true}
                    )
                    .setImage(interaction.guild.members.cache.get(userInfo.id).displayAvatarURL());
        await channel.send({embeds:[embed]});
        await interaction.editReply({embeds:[client.embed("Başarılı!", "Kayıt tamamlandı ve log kanalına yazıldı.")], ephemeral:true})
        await interaction.message.delete();

    }
}