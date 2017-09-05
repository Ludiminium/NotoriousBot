const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '='

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');

  let channel = message.channel
  let author = message.author
  let server = message.guild


  if (command === 'nick' & message.author.id === '124989722668957700') {
    client.user.setUsername(argresult)
      .then(user => console.log(`My new username is ${user.username}`))
      .catch(console.error);
    };

  if (command === 'rape') {
    channel.send(`You just raped ${argresult}`)
      .then(message => console.log(`send message: ${message.content}`))
      .catch(console.error);
  };

  if (command === 'info' || command === 'help') {
    channel.send('No embed yet so no help.')
      .then(message => console.log(`send message: ${message.content}`))
      .catch(console.error);
  };

});



client.on('message', (message) => {

  let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');

  let channel = message.channel

  if(message.author.bot) return;

  if (message.content.includes('ping')) {
    channel.send('pong')
  };

  if (message.content.includes('pubg')) {
    var pubg = ['ja', 'nee', 'kom zelf pubg', 'waarom?', 'wel met esref', 'okay', 'kom csgo']
    channel.send(pubg[Math.floor(Math.random() *pubg.length)])
  }

});


