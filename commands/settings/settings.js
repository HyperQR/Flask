const fs = require('fs');
const path = require('path');
module.exports = {
  name: 'settings',
  description: 'Show the settings you can change',
  execute(message, client, args, Discord) {
      if(args[0] == 'help') {
          const settings = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`All The Settings For Flask!`)
          .setDescription(`__Member__ \n➤ Welcome \n **This needs to be added.** \n➤ Leave \n **This needs to be added.** \n __Cool Stuff__ \n ➤ Promotion  \n **This needs to be added.** \n ➤ flask announcements \n **This needs to be added.** \n  __Moderation__ \n ➤ Logs \n **This needs to be added.**`)
          .setTimestamp();
      message.reply({
          embeds: [settings]
      })
      return;
      }
      
      if (args.length < 2) { 
          const nochannel = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`<a:cross:910840621097447475> You did not define a channel`)
          .addFields(
              { name: `How do i this?`, value: `You should try **fl.settings [Your choice of settings] [Your channel]**`, inline: true },
          )
          message.channel.send({ embeds: [nochannel]})
          return;
        }

     let cid = args[1].replace("<", "").replace("#", "").replace(">", "")
  
      if(args[0] == 'promo') {
        const fileLocation = path.resolve("./settings/promo/channels.json");
        const storageFileText = fs.readFileSync(fileLocation, 'utf-8');
        const storageFileJSON = JSON.parse(storageFileText);
        storageFileJSON["channel"].push(cid);
        fs.writeFileSync(fileLocation, JSON.stringify(storageFileJSON));
          message.channel.send("You have been added to the promo list")
          return;
      }
  }
}