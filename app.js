const {Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const {token} = require('./config.json')
const database = require('./src/utils/database/guilds_Methods.js');
const {embed} = require('./src/utils/methods/embed.js');


//bot tanımı
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

//command handler
client.commands = new Collection();
client.globalCommands = new Collection();
const folderPaths = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(folderPaths);
for (let category of commandFolders){
    let commandsPath= path.join(folderPaths, category);
    let commandFiles = fs.readdirSync(commandsPath).filter(commandFile => commandFile.endsWith('.js'));
    for (let commandFile of commandFiles){
        let commandPath = path.join(commandsPath, commandFile);
        let command = require(commandPath);
        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command)
            if(category != "Admin"){ client.globalCommands.set(command.data.name, command)}
        }else{
            console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`);
        }
    }
}

//event handler
const eventsPath = path.join(__dirname, 'src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (let eventFile of eventFiles){
    let eventFilePath = path.join(eventsPath, eventFile);
    let event = require(eventFilePath);
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args, client));
    }else{
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

//----------------------- component handler ----------------------
//-select menus
client.selectMenus = new Collection();
const selectmenusPath = path.join(__dirname, 'src/components/selectMenus');
const selectMenus = fs.readdirSync(selectmenusPath).filter(file => file.endsWith('.js'));
for (let selectmenu of selectMenus){
    let menuPath = path.join(selectmenusPath, selectmenu);
    let menu = require(menuPath);
    client.selectMenus.set(menu.data.name, menu);
}

// database ------
client.database = database;

//methods initialize
client.embed = embed;

//emoji setup
client.emoji = new Collection(); 

//bot aktifleştirme
client.login(token);