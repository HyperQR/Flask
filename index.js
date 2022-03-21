// This is needed for discord.js
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Stuff added by npm
const fs = require('fs'); //npm i fs

//This code is for reading commands on luanch 
const Status = require('./config/Status.js')
const config = require('../flask-config/config.json')
const prefixchecker = require('../flask-config/config.json')
const token = config.token;
const configprefix = prefixchecker.prefix;
client.commands = new Discord.Collection();

//Logs
const logs = require('./settings/logs/logs.json')

// Define a function to load commands from a specific given folder
function loadCommandsFromFolder(folder) {
    const commandFiles = fs.readdirSync(folder).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}
// Load commands from folder './commands/moderation'
loadCommandsFromFolder('./commands/moderation');

// Load commands from folder './commands/media'
loadCommandsFromFolder('./commands/media');

// Load commands from folder './commands/help'
loadCommandsFromFolder('./commands/help');

// Load commands from folder './commands/utility'
loadCommandsFromFolder('./commands/utility');

// Load commands from folder './commands/test'
loadCommandsFromFolder('./commands/test');

// Load commands from folder './commands/fun'
loadCommandsFromFolder('./commands/fun');

// Load commands from folder './commands/ownercmds
loadCommandsFromFolder('./commands/ownercmds');

// Load commands from folder './commands/settings
loadCommandsFromFolder('./commands/settings');

//Prefix for bot
const prefix = configprefix;

//This turns the bot on
client.on("ready", () => {
    console.log(`[+] Logged in as ${client.user.tag}!`);
    Status(client);
});

//This is for Commands to register
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, client, args, Discord);
    }
    if (command === 'staff') {
        client.commands.get('staff').execute(message, client, args, Discord);
    }
    if (command === 'help') {
        client.commands.get('help').execute(message, client, args, Discord);
    }
    if (command === 'prefix') {
        client.commands.get('prefix').execute(message, client, args, Discord);
    }
    if (command === 'changelog') {
        client.commands.get('changelog').execute(message, client, args, Discord);
    }
    if (command === 'kick') {
        client.commands.get('kick').execute(message, client, args, Discord);
    }
    if (command === 'ban') {
        client.commands.get('ban').execute(message, client, args, Discord);
    }
    if (command === 'clear') {
        client.commands.get('clear').execute(message, client, args, Discord);
    }
    if (command === 'play') {
        client.commands.get('play').execute(message, client, args, Discord)
    }
    if (command === 'stop') {
        client.commands.get('stop').execute(message, client, args, Discord)
    }
    if (command === 'suggest') {
        client.commands.get('suggest').execute(message, client, args, Discord)
    }
    if (command === 'hangman') {
        client.commands.get('hangman').execute(message, client, args, Discord)
    }
    if (command === 'status') {
        client.commands.get('status').execute(message, client, args, Discord)
    }
    if (command === 'devtools') {
        client.commands.get('devtools').execute(message, client, args, Discord)
    }
    if (command === 'cah') {
        client.commands.get('cah').execute(message, client, args, Discord)
    } if (command === 'rps') {
        client.commands.get('rps').execute(message, client, args, Discord)
    }
    if (command === 'test') {
        client.commands.get('test').execute(message, client, args, Discord)
    }
    if (command === 'test2') {
        client.commands.get('test2').execute(message, client, args, Discord)
    }
    if (command === 'add') {
        client.commands.get('add').execute(message, client, args, Discord)
    }
    if (command === 'check') {
        client.commands.get('check').execute(message, client, args, Discord)
    }
    if (command === 'settings') {
        client.commands.get('settings').execute(message, client, args, Discord)
    }
    if (command === 'embeds') {
        client.commands.get('embeds').execute(message, client, args, Discord)
    }
    if (command === 'promo') {
        client.commands.get('promo').execute(message, client, args, Discord)
    }
    if (command === 'test3') {
        client.commands.get('test3').execute(message, client, args, Discord)
    }
})

client.on("guildCreate", async (guild) => {
    const joinembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTitle("New Server!")
        .addField("Server Name", guild.name, true)
        .addField("Server ID", guild.id, true)
        .addField("Owner ID", guild.ownerId, true)
        .addField("Owner Mention", `<@${guild.ownerId}>`, true)
        .addField("Member Count", guild.memberCount.toString(), true)

    client.channels.fetch(logs['Leave/join'])
        .then(channel => {
            channel.send({
                embeds: [joinembed]
            })
        })
        .catch(err => {
            console.error(`\nError sending guildCreate message:\n${err}`);
        });
});
client.on("guildDelete", async (guild) => {
    //All this does is reports back to us for analytics, this is only accessed by @Ohmeg & the staff team also nobody else can access these stats
    const leaveembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTitle("I got kicked for a server!")
        .addField("Server Name", guild.name, true)
        .addField("Server ID", guild.id, true)
        .addField("Owner ID", guild.ownerId, true)
        .addField("Owner Mention", `<@${guild.ownerId}>`, true)
        .addField("Member Count", guild.memberCount.toString(), true)

    client.channels.fetch(logs['Leave/join'])
        .then(channel => {
            channel.send({
                embeds: [leaveembed]
            })
        })
        .catch(err => {
            console.error(`\nError sending guildCreate message:\n${err}`);
        });
});

client.on('messageDelete', async message => {
    // Ignore direct messages
    let logsguild = logs.guild
    if (!logsguild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    });
    // Since there's only 1 audit log entry in this collection, grab the first one
    const deletionLog = fetchedLogs.entries.first();

    // Perform a coherence check to make sure that there's *something*
    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

    // Now grab the user object of the person who deleted the message
    // Also grab the target of this action to double-check things
    const { executor, target } = deletionLog;

    // Update the output with a bit more information
    // Also run a check to make sure that the log returned was for the same author's message
    if (target.id === message.author.id) {
        console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
    } else {
        console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
    }
});

//Bot token below to get token go to: https://discord.com/developers/applications
try {
    client.login(token);
}
catch {
    console.log('Token invalid, go outside of the flask folder and into flask-config, then fill in the token');
}

//BOT CODE!
//=================================================================================================================================\\
//API!

const { json } = require("express");
var express = require("express");

var port = 1455;

var app = express();
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);

    app.get("/", (req, res, next) => {
        res.status(200);
        console.log(new Date().toLocaleString() + ' ::API Main Requested::');
        res.send("Welcome to the Flask API, to get an API key and/or to find the documentation, go to https://github.com/Flask-Discord/Flask/blob/main/api/README.md");

    });

    app.get("/usercount", (req, res, next) => {
        if (req.query.apikey == undefined) {
            res.status(400);
            res.send('API Key not defined, you can request one by following the instructions at https://github.com/Flask-Discord/Flask/blob/main/api/README.md');
        } else {
            res.status(200);

            console.log(new Date().toLocaleString() + " ::API Usercount Requested:: API Key: " + req.query.apikey);
            res.json({
                "usercount": "42",
                "server": "Flask",
                "server-id": "909232074253295638",
            });
        }
    });

    app.get("/ping", (req, res, next) => {
        res.status(200);

        var recentping = fs.readFileSync('ping.pong', 'utf-8');

        console.log(new Date().toLocaleString() + ` ::API Ping Requested:: Ping: ${recentping}`);
        res.json({
            "ping": `${recentping}`,
        });
    });
});