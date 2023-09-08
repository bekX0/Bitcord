const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { guilds_Schema } = require('../utils/database/guilds_Schema');
const {guildId} =require("../../config.json");
require('dotenv').config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		let sqlConnectionString = process.env.SQL;
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

		//fetching react-role messages
		guildsDatabase.forEach(async guild => {
			if(guild.reactionRoles.length !== 0){
				guild.reactionRoles.forEach(async message => {
					await client.guilds.cache.get(guild.guildId).channels.cache.get(message.channelID).messages.fetch(message.messageID);
				})
			}
			if(guild.registerSystemStatus){
				await client.guilds.cache.get(guild.guildId).channels.cache.get(guild.regRequestChannel).messages.fetch();
			}
		})

		// autorole sync
		await client.guilds.fetch();
		await client.guilds.cache.forEach(async guild => {
			await guild.members.fetch();
			await guild.members.cache.forEach(async member => {
				if(member.roles.cache.size === 1){
					let __guild__ = guildsDatabase.find(db => db.guildId === guild.id);
					if(__guild__.autoRoleStatus){
						await member.roles.add(__guild__.autoRoleList);
					}
				}
			})
		})


		// await new Promise(async (resolve, reject) => {
		// 	await client.guilds.fetch();
			
		// 	resolve(); // İşlem tamamlandığında Promise'i çöz
		// });

		//setup completed --------------------------------------------
		console.log(`${client.user.username} is ready!!`);
	},
};