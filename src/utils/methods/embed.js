const { EmbedBuilder } = require("discord.js")

exports.embed = (title, desc = "", color = "#93A8AC") => {
    let message = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(desc)
                    .setColor(color);
    return message;
}