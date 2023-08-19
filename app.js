const {Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const database = require('./src/utils/database/guilds_Methods.js');
const {embed} = require('./src/utils/methods/embed.js');
require('dotenv').config();


//bot tanımı
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions]})

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
        client.once(event.name, (...args) => event.execute(...args));
    }else{
        client.on(event.name, (...args) => event.execute(...args))
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
    if('data' in menu && 'execute' in menu){
        client.selectMenus.set(menu.data.name, menu);
    }
}
//-buttons
client.buttons = new Collection();
const buttonsPath = path.join(__dirname, 'src/components/buttons');
const buttons = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
for (let buttonFile of buttons){
    let buttonPath = path.join(buttonsPath, buttonFile);
    let button = require(buttonPath);
    if('data' in button && 'execute' in button){
        client.buttons.set(button.data.name, button);
    }
}

// database ------
client.database = database;

//methods initialize
client.embed = embed;

//emoji setup
client.emoji = new Collection(); 

//bot aktifleştirme
client.login(process.env.TOKEN);