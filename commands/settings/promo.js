module.exports = {
    name: "promo",
    description: "Will send promote",
    execute(message, client) {
        let channels = require('../../settings/promo/channels.json')
        for (chID of channels.channel) {
            client.channels.fetch(chID)
                .then(channel => {
                    channel.send("test")
                })
            .catch(err => {
                console.error(`\nError sending guildCreate message:\n${err}`);
            });
        }
        console.log(channels)
    }
}