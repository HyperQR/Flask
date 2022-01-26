const Discord = require('discord.js')
const packageJSON = require("../../package.json");
const infofile = require("../../config/info.json")

module.exports = {
    name: "staff",
    description: "Sends a embed of all the staff of flask",
    execute(message) {
        discordJSVersion = packageJSON.dependencies["discord.js"];
        const staffembed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`💻 Staff!`)
        .addFields(
            { name: '**Developers**', value: `\`\`\`${infofile.Developers}\`\`\``, inline: true },
            { name: `**Artist**`, value: `\`\`\`${infofile.Artist}\`\`\``, inline: true },
            )  
        .setFooter(`Flask Version ${infofile.Version}`)
        .setTimestamp();
            message.channel.send({
            embeds: [ staffembed ]
        })
    }
}