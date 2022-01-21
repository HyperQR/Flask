const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require('discord.js')
module.exports = {
    name: 'test',
    description: 'for testing commands',
    async execute(message, client, args, Discord) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Select me',
                            description: 'This is a description',
                            value: 'first_option',
                        },
                        {
                            label: 'You can select me too',
                            description: 'This is also a description',
                            value: 'second_option',
                        },
                    ]),
            );
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setDescription('Some description here');

        await message.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
    }
}