const { Events } = require("discord.js");


module.exports = {
    name: Events.GuildMemberAdd,
    on: true,
    async execute(member){
        let guild = member.guild;
        let client = member.client
        let data = await client.database.fetch(guild)

        if(!data.autoRoleStatus) return;

        for (let role of data.autoRoleList){
            await member.roles.add(role);
        }

        
    }
}