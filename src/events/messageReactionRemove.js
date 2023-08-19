const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageReactionRemove,
    on: true,
    async execute(reaction, user){
        let client = reaction.client;
        let data = await client.database.fetch(reaction.message.guildId);
        let member = client.guilds.cache.get(reaction.message.guildId).members.cache.get(user.id)
        
        //eğer kayıtlı mesaj yoksa
        if(data.reactionRoles.length === 0){
            return;
        }

        // eğer kayıtlı mesaj idsi yoksa
        if(!data.reactionRoles.map(rr => rr.messageID).includes(reaction.message.id)) return;

        if(reaction._emoji.name == '1️⃣' && '1' in data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)){
            try {
                await member.roles.remove(data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)['1'])
            } catch (error) {
                
            }
        }

        if(reaction._emoji.name == '2️⃣' && '2' in data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)){
            try {
                await member.roles.remove(data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)['2'])
            } catch (error) {
                
            }
        }

        if(reaction._emoji.name == '3️⃣' && '3' in data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)){
            try {
                await member.roles.remove(data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)['3'])
            } catch (error) {
                
            }
        }

        if(reaction._emoji.name == '4️⃣' && '4' in data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)){
            try {
                await member.roles.remove(data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)['4'])
            } catch (error) {
                
            }
        }

        if(reaction._emoji.name == '5️⃣' && '5' in data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)){
            try {
                await member.roles.remove(data.reactionRoles.find(rr=> rr.messageID == reaction.message.id)['5'])
            } catch (error) {
                
            }
        }
    }
}