const { guilds_Schema } = require("./guilds_Schema");

exports.fetch = async (guild, client) => {
    if(typeof guild === "string"){
        let guildData = await guilds_Schema.findOne({guildId: guild});

        if(guildData){
            return guildData;
        }else{
            let __guild__ = client.guilds.cache.get(guild);
            let guildData = new guilds_Schema({
                guildId: __guild__.id,
                guildName: __guild__.name,
                ownerId: __guild__.ownerId
                })
            guildData.save();
            return guildData;
        }
    }else if(typeof guild === "object"){
        let guildData = await guilds_Schema.findOne({guildId: guild.id});

        if(guildData){
            return guildData;
        }else{
            let guildData = new guilds_Schema({
                guildId: guild.id,
                guildName: guild.name,
                ownerId: guild.ownerId
                })
            guildData.save();
            return guildData;
        }
    }
}

exports.update = async (guild, update) => {
    if(typeof guild === "string"){
        await guilds_Schema.updateOne({guildId: guild}, {update});
        
    }else if(typeof guild === "object"){
        await guilds_Schema.updateOne({guildId: guild.id}, {$set:update});
    }
}