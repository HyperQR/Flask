const channels = require('../../settings/logs/temp.json')
module.exports = {
    name: "embeds",
    description: "sends embeds",
    execute(message, client, args, Discord) {
        const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
        //Channels

        const botinv = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('🤖 Bot Invite')
                .setStyle('LINK')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=909211342643273738&permissions=138985991366&scope=bot')
        ); 
        const discordinv = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('🌆 Discord Invite')
                .setStyle('LINK')
                .setURL('https://discord.gg/KtmF2Geyy4t')
        ); 
        const Github = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('🐈 GitHub')
                .setStyle('LINK')
                .setURL('https://github.com/Flask-Discord/Flask')
        ); 

        const FAQ = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Links")
        .addFields(
            { name: `Bot Invite`, value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=909211342643273738&permissions=138985991366&scope=bot)`},
            { name: `Discord Invite`, value: `[Click Here](https://discord.gg/KtmF2Geyy4)`},
            { name: `GitHub`, value: `[Click Here](https://github.com/Flask-Discord/Flask)`},
        )
        message.channel.send({ embeds: [FAQ],components: [botinv, discordinv, Github]})
    }
}