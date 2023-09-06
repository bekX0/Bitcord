const { Events } = require("discord.js");


module.exports = {
    name: Events.GuildMemberRemove,
    on: true,
    async execute(member){
        let guild = member.guild;
        let client = member.client
        let data = await client.database.fetch(guild)

        if(data.registerRequested.map(element => element.id).includes(member.id)){
            let indexNum = data.registerRequested.indexOf(data.registerRequested.find(r => r.id === member.id));
            info = data.registerRequested[indexNum];
            //delete old message
            let channel = guild.channels.cache.get(data.regRequestChannel);
            await channel.messages.fetch();
            await channel.messages.cache.get(info.messageID).delete();
            //db old request erease
            let updateArray = data.registerRequested
            updateArray.splice(indexNum, 1);
            await client.database.update(guild, {registerRequested: updateArray})
        }
    }
}