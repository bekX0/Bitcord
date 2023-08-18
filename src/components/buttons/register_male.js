const { EmbedBuilder } = require("discord.js");

module.exports = {
    data:{
        name: "reg_m"
    },
    async execute(interaction){
        let client = interaction.client;
        let data = await client.database.fetch(interaction.guild);

        //Is user has registerer role?
        for (let role of data.registererRoles){
            if(!interaction.member.roles.cache.has(role)){
                await interaction.reply({embeds:[client.embed("Hata!", "Görünüşe göre kayıt yetkilisi değilsin.")]})
                return;
            }
        }
        let userInfo = data.registerRequested.find(r => r.messageID === interaction.message.id);

        let member = interaction.guild.members.cache.get(userInfo.id);
        //db old request erease
        let indexNum = data.registerRequested.indexOf(data.registerRequested.find(r => r.id === userInfo.id));
        let updateArray = data.registerRequested
        updateArray.splice(indexNum, 1);
        await client.database.update(interaction.guild, {registerRequested: updateArray})

        await member.roles.add([data.registeredRoles.male, data.registeredRoles.reg]);
        await member.roles.remove(data.unregisteredRole);
        await member.setNickname(`${userInfo.name} » ${userInfo.age}`);
        await interaction.message.delete();
        //log register
        let channel = interaction.guild.channels.cache.get(data.regLogChannel);
        let embed = new EmbedBuilder()
                    .setTitle('Yeni Kayıt')
                    .addFields(
                        {name:"Kayıt Yetkilisi", value:`<@${interaction.member.id}>`, inline:true},
                        {name:"Üye:", value:`<@${userInfo.id}>`, inline:true}
                    )
                    .setImage(interaction.guild.members.cache.get(userInfo.id).getAvatarURL());
        await channel.send({embeds:[embed]});
        await interaction.reply({embeds:[client.embed("Başarılı!", "Kayıt tamamlandı ve log kanalına yazıldı.")]})

    }
}