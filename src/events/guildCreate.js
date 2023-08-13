const { Events } = require("discord.js");
const {fetch} = require('../utils/database/guilds_Methods.js');

module.exports = {
    name: Events.GuildCreate,
    on: true,
    async execute(guild, client){
        await fetch(guild, client);
    }
}