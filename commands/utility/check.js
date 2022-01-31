const perms = require('../../settings/dev_and_prime/storage.json')
module.exports = {
    name: 'check',
    description: 'Checks if a user is dev/prime/primeguild',
       execute(message, args, Discord) {
        try {
            const target = message.mentions.users.first();
            
            if (args[0] == 'dev') {

                if (perms.devs.includes(target.id)) {
                    const devtag = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`<a:tick:910903522663489556> ${target.tag} is a Dev`)
                        message.channel.send({ embeds: [devtag]})
                        return;
                }

                if (perms.devs.includes(message.author.id)) {
                    const dev = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`<a:tick:910903522663489556> ${message.author.tag} is a Dev`)
                         message.channel.send({ embeds: [dev] })
                }
            }

            if (args[0] == 'prime') {

                if (perms.prime.includes(target.id)) {
                    const primetag = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`<a:tick:910903522663489556> ${target.tag} is a Prime user`)
                    message.channel.send({ embeds: [primetag] })
                    return;
                }

                if (perms.prime.includes(message.author.id)) {
                    const prime = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`<a:tick:910903522663489556> ${message.author.tag} is a Dev`)
                    message.channel.send({ embeds: [prime] })
                }
            }
        } catch (err){
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