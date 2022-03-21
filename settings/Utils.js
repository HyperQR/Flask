module.exports = {
 async isTestUser(message, member) {
    const supportGuild = message.client.guilds.cache.get('930631518953553980')
    console.log(`Support Guild: ${supportGuild}`)
    const member = await supportGuild.members.cache.find(message.member.id)
    const isDonator = member ? member.roles.cache.some(role => role.id === '941768911878250506') : false
    const donatorRole = member.roles.cache.some(role => role.id === '941768911878250506')
    return isDonator
    },
}