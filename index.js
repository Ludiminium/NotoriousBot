const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '='

client.on('ready', () => {
  console.log('I am ready!');
});

require('./public/commands.js')


client.login('MzUzODk3MjU2MTUzNTEzOTg3.DI2YHw.B6TM06NfP8nQulVZ7vtmiDmc95A');
