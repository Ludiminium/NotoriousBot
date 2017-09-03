const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '='

client.on('ready', () => {
  console.log('I am ready!');
});

require('./public/commands.js')


client.login(token);
