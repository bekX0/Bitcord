const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('tepki-rol')
		.setDescription('Kullanıcıların tepki vererek rol almalarını sağlar.')
        .setDMPermission(false)
        .addStringOption(option => option.setName('title').setDescription('Mesajın başlığı').setRequired(true))
        .addRoleOption(option => option.setName('role1').setDescription('Tepki ile alınacak rol').setRequired(true))
        .addRoleOption(option => option.setName('role2').setDescription('Tepki ile alınacak rol').setRequired(false))
        .addRoleOption(option => option.setName('role3').setDescription('Tepki ile alınacak rol').setRequired(false))
        .addRoleOption(option => option.setName('role4').setDescription('Tepki ile alınacak rol').setRequired(false))
        .addRoleOption(option => option.setName('role5').setDescription('Tepki ile alınacak rol').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        let client = interaction.client;
        let channel = interaction.channel;

        let data = await client.database.fetch(interaction.guild);
        //check reaction-role limit for guild
        let max = data.guildLevel === 0 ? 2 : data.guildLevel === 1 ? 5 : 8;
        if(data.reactionRoles.length + 1 > max){
            await interaction.reply({embeds:[client.embed('Sınıra Ulaştın', "Sunucun için oluşturabileceğin tüm tepki rolü mesajlarını kullandın.")], ephemeral:true});
            return;
        }
        let title = interaction.options.getString('title');
        let options = interaction.options._hoistedOptions;
        options.splice(0, 1);
        let content = "";
        options.forEach((item, index) => {
            switch (index) {
                case 0:
                    content += `1️⃣: ${item.role.name}\n\n`
                    break;

                case 1:
                    content += `2️⃣: ${item.role.name}\n\n`
                    break;

                case 2:
                    content += `3️⃣: ${item.role.name}\n\n`
                    break;

                case 3:
                    content += `4️⃣: ${item.role.name}\n\n`
                    break;

                case 4:
                    content += `5️⃣: ${item.role.name}\n\n`
                    break;
            
                default:
                    break;
            }
        })
        let respond = await channel.send({embeds:[client.embed(title, content)], fetchReply:true}).then(msg => {
            let array = data.reactionRoles;
            switch (options.length) {
                case 1:
                    msg.react('1️⃣')
                    array.push({messageID: msg.id, channelID: msg.channelId, 1:options[0].value});
                    break;
                case 2:
                    msg.react('1️⃣')
                    msg.react('2️⃣')
                    array.push({messageID: msg.id, channelID: msg.channelId, 1:options[0].value, 2:options[1].value});
                    break;
                case 3:
                    msg.react('1️⃣')
                    msg.react('2️⃣')
                    msg.react('3️⃣')
                    array.push({messageID: msg.id, channelID: msg.channelId, 1:options[0].value, 2:options[1].value, 3:options[2].value});
                    break;
                case 4:
                    msg.react('1️⃣')
                    msg.react('2️⃣')
                    msg.react('3️⃣')
                    msg.react('4️⃣')
                    array.push({messageID: msg.id, channelID: msg.channelId, 1:options[0].value, 2:options[1].value, 3:options[2].value, 4:options[3].value});
                    break;
                case 5:
                    msg.react('1️⃣')
                    msg.react('2️⃣')
                    msg.react('3️⃣')
                    msg.react('4️⃣')
                    msg.react('5️⃣')
                    array.push({messageID: msg.id, channelID: msg.channelId, 1:options[0].value, 2:options[1].value, 3:options[2].value, 4:options[3].value, 5:options[4].value});
                    break;
            
                default:
                    break;
            }
            client.database.update(interaction.guild, {reactionRoles: array});
        });
        await interaction.reply({content:"başarı", ephemeral:true})
	}
};