module.exports = {
    name: 'test3',
    description: 'for testing commands',
    async execute(message, client, args, Discord) {
      const perms = require('../../settings/Utils')
      if (perms.isTestUser(message.member)){
       //console.log("test")
       message.channel.send("you are dev")
    }
   }
}