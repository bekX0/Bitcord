const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kayıt')
		.setDescription('Sunucuya kayıt olamnız için bir talep açar.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption(option => option.setName('ad').setDescription('Sana seslenebilmemiz için bize adını söylemelisin.').setRequired(true))
        .addStringOption(option => option.setName('yas').setDescription('Kaç yaşında olduğunu söyler misin?').setRequired(true))
        .addStringOption(option => option.setName('aciklama').setDescription('Bizlere kendinen kısaca bahsetmeni istiyoruz.').setRequired(true))
        .setDMPermission(false),
    async execute(interaction){
        let client = interaction.client;
        //check if guild opened the register system...
        let data = await client.database.fetch(interaction.guild.id);
        // if register system offline
        if(!data.registerSystemStatus){
            await interaction.reply({embeds:[client.embed("Hata!", "Kayıt sistemi sunucunda aktif durumda değil.\nLütfen bir yetkiliyle iletişime geç!")], ephemeral:true})
            return;
        }

        //if user already requested
        if(data.registerRequested.map(e => e.id).includes(interaction.member.id)){
            await interaction.reply({embeds:[client.embed("Hata!", "Zaten bir kayıt talebin var!")], ephemeral:true})
            return;
        }
        //if user has not unregistered role
        if(!interaction.member.roles.cache.has(data.unregisteredRole)){
            await interaction.reply({embeds:[client.embed("Hata!", "Zaten kayıt olmuşa benziyorsun...")], ephemeral:true})
            return;
        }
        const name = interaction.options.getString('ad');
        const age = interaction.options.getString('yas');
        //const city = interaction.options.getString('sehir') ?? 'belirtmedi';
        const desc = interaction.options.getString('aciklama');


        const channel = interaction.guild.channels.cache.get(data.regRequestChannel)

        const embed = new EmbedBuilder()
            .setColor("#5CE689")
            .setTitle("Oley!")
            .setDescription("Kayıt talebini yetkililere gönderdim. İncelendikten sonra sana dönüş yapılacaktır.")
            .setFooter({iconURL: client.user.displayAvatarURL(), text: `Mahallenin dost canlısı asistanı **${client.user.username}**`});

        const logEmbed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle('Kayıt Talebi')
            .setThumbnail(interaction.member.displayAvatarURL())
            .setDescription(`Talebi açan: <@${interaction.member.id}>`)
            .addFields(
                {name:'Ad', value: name, inline:true},
                {name:'Yaş', value: age, inline:true},
                //{name:'Şehir', value: city, inline:true},
                {name:'Açıklama', value: desc, inline:false},
            )
            .setFooter({iconURL: client.user.avatarURL(), text: `Mahallenin dost canlısı asistanı **${client.user.username}**`});
        //kayıt butonları ekleme
        let bt1 = new ButtonBuilder()
                .setCustomId('reg_m')
                .setStyle(ButtonStyle.Primary)
                .setEmoji(client.emoji.get('male').id);
        let bt2 = new ButtonBuilder()
                .setCustomId('reg_f')
                .setStyle(ButtonStyle.Primary)
                .setEmoji(client.emoji.get('female').id);
        let bt3 = new ButtonBuilder()
                .setCustomId('reg_del')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.get('settings').id);
        let bt4 = new ButtonBuilder()
                .setCustomId('reg_ban')
                .setStyle(ButtonStyle.Danger)
                .setEmoji(client.emoji.get('banhammer').id);
        let row = new ActionRowBuilder().addComponents(bt1, bt2, bt3, bt4);
        await interaction.reply({embeds: [embed], ephemeral:true});
        let response = await channel.send({embeds: [logEmbed], components:[row]});

        data.registerRequested.push({id: interaction.member.id, messageID: response.id, name: name, age: age})
        await client.database.update(interaction.guild, {registerRequested: data.registerRequested});
    }
}