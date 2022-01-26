const perms = require('../../settings/dev_and_prime/storage.json')
module.exports = {
    name: 'test2',
    description: 'for testing commands',
    async execute(message, client, args, Discord) {
        if (perms.primeguilds.includes(message.guild.id)) {
            message.channel.send("Congrats Your Guild is a prime guild!")
        }else{
            message.channel.send("Sad :( You arent a prime guild ")
        }
        if (perms.prime.includes(message.author.id)) {
            message.channel.send("Congrats Your Guild is a prime user!")
        } else {
            message.channel.send("Sad :( You arent a prime user ")
        }
        if (perms.devs.includes(message.author.id)) {
            message.channel.send("Congrats Your Guild is a dev")
        } else {
            message.channel.send("Sad :( You arent a Dev ")
        }
    }
}