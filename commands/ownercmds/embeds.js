module.exports = {
    name: "embeds",
    description: "sends embeds",
    execute(message, client, args, Discord) {
        const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
        //Channels

        const FAQ = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("FAQ")
        //Edit things below
        .addFields(
            { name: `Bot Invite`, value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=909211342643273738&permissions=138985991366&scope=bot)`},
            { name: `Discord Invite`, value: `[Click Here](https://discord.gg/KtmF2Geyy4)`},
            { name: `GitHub`, value: `[Click Here](https://github.com/Flask-Discord/Flask)`},
        )
        message.channel.send({ embeds: [FAQ]})
    }
}