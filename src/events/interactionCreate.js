module.exports = {
    name: "interactionCreate",
    execute: async (interaction) => {
      const client = interaction.client;
    if (interaction.isChatInputCommand()){
        const command = client.commands.get(interaction.commandName);

	    if (!command) {
	    	console.error(`No command matching ${interaction.commandName} was found.`);
	    	return;
	    }

	    try {
	    	await command.execute(interaction);
	    } catch (error) {
	    	    console.error(error);
	    	    if (interaction.replied || interaction.deferred) {
	    		    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
	    	    } else {
	    		    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    	    }
	        }
        }

        //autocomplete
        else if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
      
            if (!command) {
              console.error(
                `No command matching ${interaction.commandName} was found.`
              );
              return;
            }
      
            try {
              await command.autocomplete(interaction);
            } catch (error) {
              console.error(error);
            }
          }


        // selectmenus
        else if (interaction.isAnySelectMenu()){
          let id = interaction.customId;
          let menu = client.selectMenus.get(id);
          try {
            menu.execute(interaction);
          } catch (error) {
            console.log(error);
            console.log(`${id} gave an error!`);
          }
        }

        //buttons
        else if (interaction.isButton()){
          let id = interaction.customId;
          let button = client.buttons.get(id);
          try {
            button.execute(interaction);
          } catch (error) {
            console.log(error);
            console.log(`${id} gave an error!`);
          }
        }

        // modals
        else if (interaction.isModalSubmit()){
          let id = interaction.customId;
          let modal = client.modals.get(id);
          try {
            modal.execute(interaction);
          } catch (error) {
            console.log(error);
            console.log(`${id} gave an error!`);
          }
        }
    }
}