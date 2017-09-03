const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '='

client.on('ready', () => {
  console.log('I am ready!');
});



client.on('message', (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  var argresult = args.join(' ');

  if (command === "nick" & message.author.id === '124989722668957700'){
    client.user.setUsername(argresult)
      .then(user => console.log(`My new username is ${user.username}`))
      .catch(console.error);
    }

});


client.login('MzUzODk3MjU2MTUzNTEzOTg3.DI2YHw.B6TM06NfP8nQulVZ7vtmiDmc95A');
