const perms = require('../../settings/dev_and_prime/storage.json')
module.exports = {
    name: 'status',
    description: 'Sets bots status to idle',
    execute(message, client, args, Discord) {
     try {
         if (perms.devs.includes(message.author.id)) {
            if(args[0] == 'sleep') {
                client.user.setStatus('idle');
                const SleepEmbed = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setTitle(`🌙 Night Night, My status is now \`\`Idle!\`\``)
                    .setTimestamp();
                message.channel.send({
                    embeds: [SleepEmbed]
                })
            }

            if (args[0] == 'dnd') {
                client.user.setStatus('dnd');
                const DNDEmbed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setTitle(`❌ BRO STOP TALKING TO ME, My status is now \`\`DND!\`\``)
                    .setTimestamp();
                message.channel.send({
                    embeds: [DNDEmbed]
                })
            }

            if (args[0] == 'online') {
                client.user.setStatus('online');
                const OnlineEmbed = new Discord.MessageEmbed()
                    .setColor(`GREEN`)
                    .setTitle(`🛒 Man people are cool they know i am online, My status is now \`\`Online!\`\``)
                    .setTimestamp();
                message.channel.send({
                    embeds: [OnlineEmbed]
                })
            }
        }else{
        const errrorembed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("There was a error!")
            .setDescription(`Error details \n \`You are not a developer\``)
                message.reply({
                    embeds: [errrorembed]
            })
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
