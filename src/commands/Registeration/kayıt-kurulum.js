const { SlashCommandBuilder, PermissionFlagsBits, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('kayıt-kurulum')
            .setDescription('Sunucunuza kayıt sistemini kurmanızı sağlar.')
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        let client = interaction.client;
        let emoji = (name) => {return client.emoji.get(name)};

        let selectMenu = new StringSelectMenuBuilder()
                        .setPlaceholder(`Kayıt Menüsü`)
                        .setCustomId('register-setup')
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Rolleri Düzenle')
                                .setEmoji(`${emoji('settings').id}`)
                                .setValue('reg_roles'),
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Kanalları Düzenle')
                                .setEmoji(`${emoji('settings').id}`)
                                .setValue('reg_channels'),
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Sistemi Aç/Kapat')
                                .setEmoji(`${emoji('settings').id}`)
                                .setValue('reg_switch')
                        )
        let row = new ActionRowBuilder().addComponents(selectMenu)

        let data = await interaction.client.database.fetch(interaction.guild.id);
        let embed = new EmbedBuilder()
                            .setTitle('Kayıt Sistemi Paneli')
                            .addFields(
                                {name:'Sistem Durumu', value: data.registerSystemStatus ? `${emoji('on')} Açık` : `${emoji('off')} Kapalı`, inline:false},
                                {name:'Kayıtçı Rolleri', value:data.registererRoles.length === 0 ? 'Yok' : data.registererRoles.map(role => `<@&${role}>`).join(','), inline:true},
                                {name:'Kayıt Talebi Kanalı', value: data.regRequestChannel ? `<#${data.regRequestChannel}>` : 'Yok', inline:true},
                                {name:'Kayıt Log Kanalı', value:data.regLogChannel ? `<#${data.regLogChannel}>` : 'Yok', inline:false},
                                {name:'Kayıtsız Üye Rolü', value:data.unregisteredRole ? `<@&${data.unregisteredRole}>` : 'Yok', inline:false},
                                {name:'Kayıtlı Üye Rolü', value:data.registeredRoles.reg ? `<@&${data.registeredRoles.reg}>` : 'Yok', inline:true},
                                {name:'Erkek Üye Rolü', value:data.registeredRoles.male ? `<@&${data.registeredRoles.male}>` : 'Yok', inline:true},
                                {name:'Kadın Üye Rolü', value:data.registeredRoles.female ? `<@&${data.registeredRoles.female}>` : 'Yok', inline:true}
                            )


        await interaction.reply({components:[row], embeds:[embed], fetchReply:true, ephemeral: true});
    }
}