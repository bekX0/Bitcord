const {Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');


//bot tanımı
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

//command handler
client.commands = new Collection();
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



//bot aktifleştirme
client.login('MTEzOTI5NTgyOTQ0MjY5MTEzMg.GcfYQN.iNR0ziFSRr4fwon8OeUIBLyp4UodItqS9V0yb0');
//MTEzOTI5NTgyOTQ0MjY5MTEzMg.GcfYQN.iNR0ziFSRr4fwon8OeUIBLyp4UodItqS9V0yb0