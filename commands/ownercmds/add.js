const fs = require('fs')
const path = require('path');
const perms = require('../../settings/dev_and_prime/storage.json')

module.exports ={
    name: 'add', 
    description: 'Addes users to ./settings/dev_and_prime/storage.json',
    execute(message, client, args, Discord) {
        try {
            const target = message.mentions.users.first();
            if (perms.devs.includes(message.author.id)) {
            if (args[0] == 'dev') {
                const fileLocation = path.resolve("./settings/dev_and_prime/storage.json")
                const storageFileText = fs.readFileSync(fileLocation, 'utf-8');
                const storageFileJSON = JSON.parse(storageFileText);
                storageFileJSON["devs"].push(target.id);
                fs.writeFileSync(fileLocation, JSON.stringify(storageFileJSON));
                const addDev = new Discord.MessageEmbed()
                    .setColor(`GREEN`)
                    .setTitle(`<a:tick:910903522663489556> ${target.tag} Was added to the dev team!`)
                    .addFields(
                        { name: `User's Discord`, value: `${target.tag}`, inline: true },
                        { name: `User's ID`, value: `${target.id}`, inline: true },
                        { name: 'Added By', value: `${message.author.tag}`, inline: true },
                    )
                    .setTimestamp();
                message.reply({
                    embeds: [addDev]
                })
            }

                if (args[0] == 'primeg') {
                    const fileLocation = path.resolve("./settings/dev_and_prime/storage.json");
                    const storageFileText = fs.readFileSync(fileLocation, 'utf-8');
                    const storageFileJSON = JSON.parse(storageFileText);
                    storageFileJSON["primeguilds"].push(message.guild.id);
                    fs.writeFileSync(fileLocation, JSON.stringify(storageFileJSON));
                    const addPrimeg = new Discord.MessageEmbed()
                        .setColor(`GREEN`)
                        .setTitle(`<a:tick:910903522663489556> ${message.guild.name} Was added to the prime guild list!`)
                        .addFields(
                            { name: `User's Discord`, value: `<@${message.guild.ownerId}>`, inline: true },
                            { name: `User's ID`, value: `${message.guild.ownerId}`, inline: true },
                            { name: 'Added By', value: `${message.author.tag}`, inline: true },
                        )
                        .setTimestamp();
                    message.reply({
                        embeds: [addPrimeg]
                    })
                }

                if (args[0] == 'prime') {
                    const fileLocation = path.resolve("./settings/dev_and_prime/storage.json");
                    const storageFileText = fs.readFileSync(fileLocation, 'utf-8');
                    const storageFileJSON = JSON.parse(storageFileText);
                    storageFileJSON["prime"].push(target.id);
                    fs.writeFileSync(fileLocation, JSON.stringify(storageFileJSON));
                    const addPrime = new Discord.MessageEmbed()
                        .setColor(`GREEN`)
                        .setTitle(`<a:tick:910903522663489556> ${target.tag} Was added to the prime list!`)
                        .addFields(
                            { name: `User's Discord`, value: `${target.tag}`, inline: true },
                            { name: `User's ID`, value: `${target.id}`, inline: true },
                            { name: 'Added By', value: `${message.author.tag}`, inline: true },
                        )
                        .setTimestamp();
                    message.reply({
                        embeds: [addPrime]
                    })
                }
          }
        } catch (err) {
            const errrorembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("There was a error!")
                .setDescription(`Error details \n \`${err}\``)
            message.reply({
                embeds: [errrorembed]
            })
        }
    }
}