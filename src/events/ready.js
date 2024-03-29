const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { guilds_Schema } = require('../utils/database/guilds_Schema');
const {sqlConnectionString, guildId} =require("../../config.json");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		if(!sqlConnectionString) return;
		await mongoose.connect(sqlConnectionString).then(() => {
			console.log("Database connection successful!");
		});

		// guilds database sync ----------------------------------------------
		let guildIDList = client.guilds.cache.map(guild => guild.id);
		let guildsDatabase = await guilds_Schema.find().exec();
		let differentIDs = guildIDList.filter(id => !guildsDatabase.map(guild => guild.guildId).includes(id));

		if( differentIDs.length > 0){
			console.log(`${differentIDs.length} guilds syncing...`)
			for ( let guildId of differentIDs){
				let guild = client.guilds.cache.find(guild => guild.id === guildId);
				client.database.fetch(guild);
			}
			console.log("Done!")
		}else{
			console.log("Guilds database is in sync!");
		}

		//emojis setup from test server----------------------------------------------
		client.guilds.cache.get(guildId).emojis.cache.forEach(e => client.emoji.set(e.name, e))
		console.log("Emoji setup competed!")

		//setup completed --------------------------------------------
		console.log(`${client.user.username} is ready!!`);
	},
};