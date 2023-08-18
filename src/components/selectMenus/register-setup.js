const { RoleSelectMenuBuilder, ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } = require("discord.js")

module.exports = {
    data:{
        name:"register-setup"
    },
    async execute(interaction) {
        let client = interaction.client;
        
        let data = await client.database.fetch(interaction.guild.id);
        let option = interaction.values[0];
        
        if(option == 'reg_roles'){
            let max = data.guildLevel === 0 ? 2 : data.guildLevel === 1 ? 5 : 10;


            let selectMenu_registerer = new RoleSelectMenuBuilder()
                            .setCustomId('reg_roles_menu_registerer')
                            .setMaxValues(max)
                            .setMinValues(1)
                            .setPlaceholder(`Kayıtçı Rolleri(${max} adet rol seçebilirsiniz.)`)
            let selectMenu_unregistered = new RoleSelectMenuBuilder()
                            .setCustomId('reg_roles_menu_unregistered')
                            .setMaxValues(1)
                            .setPlaceholder(`Kayıtsız Üye Rolü`)
            let selectMenu_registered = new RoleSelectMenuBuilder()
                            .setCustomId('reg_roles_menu_registered')
                            .setMaxValues(1)
                            .setPlaceholder(`Kayıtlı Üye Rolü`)
            let selectMenu_male = new RoleSelectMenuBuilder()
                            .setCustomId('reg_roles_menu_male')
                            .setMaxValues(1)
                            .setPlaceholder(`Erkek Rolü`)
            let selectMenu_female = new RoleSelectMenuBuilder()
                            .setCustomId('reg_roles_menu_female')
                            .setMaxValues(1)
                            .setPlaceholder(`Kadın Rolü`)

            let row1 = new ActionRowBuilder().addComponents(selectMenu_registered)
            let row2 = new ActionRowBuilder().addComponents(selectMenu_unregistered)
            let row3 = new ActionRowBuilder().addComponents(selectMenu_registerer)
            let row4 = new ActionRowBuilder().addComponents(selectMenu_male)
            let row5 = new ActionRowBuilder().addComponents(selectMenu_female)
            await interaction.reply({content: 'Rolleri seçin.', components: [row1, row2, row3, row4, row5]});
        }else if(option == 'reg_channels'){
            let selectMenu_log = new ChannelSelectMenuBuilder()
                            .setCustomId('reg_channels_menu_log')
                            .setMaxValues(1)
                            .setPlaceholder("Kayıtlar için bir log kanalı seç.")
                            .addChannelTypes(ChannelType.GuildText)
            let row1 = new ActionRowBuilder().addComponents(selectMenu_log)

            let selectMenu_request = new ChannelSelectMenuBuilder()
                            .setCustomId('reg_channels_menu_req')
                            .setMaxValues(1)
                            .setPlaceholder("Kayıt talepleri için bir kanal seç.")
                            .addChannelTypes(ChannelType.GuildText)
            let row2 = new ActionRowBuilder().addComponents(selectMenu_request)

            await interaction.reply({components: [row1, row2]})
        }else if(option == 'reg_switch'){
            //check for system requirements
            if(!data.regRequestChannel) {sendMessage(interaction); return;}
            if(!data.regLogChannel) {sendMessage(interaction); return;}
            if(data.registererRoles.lenght === 0) {sendMessage(interaction); return;}
            if(!data.unregisteredRole) {sendMessage(interaction); return;}
            if(!data.registeredRoles.reg || !data.registeredRoles.male || !data.registeredRoles.female) {sendMessage(interaction); return;}
            //
            if(data.registerSystemStatus){
                await client.database.update(interaction.guild, {registerSystemStatus: false});
                await interaction.reply({content:"Kayıt sistemi aktif!", ephemeral:true});
            }else{
                await client.database.update(interaction.guild, {registerSystemStatus: true});
                await interaction.reply({content:"Kayıt sistemi deaktif!", ephemeral:true});
            }
        }
    }
}

async function sendMessage(interaction){
    await interaction.reply({content:"Lütfen kayıt sisteminin kurulumunu tamamlayın!", ephemeral:true})
}