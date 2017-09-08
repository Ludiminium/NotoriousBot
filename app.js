const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./config/settings.json');
// const ddiff = require('return-deep-diff');
const chalk = require('chalk')
require('./util/eventLoader.js')(client);

var reload = (message, cmd) => {
  delete require.cache[require.resolve('./commands/' + cmd)];
  try {
    let cmdFile = require('./commands/' + cmd);
  } catch (err) {
    message.channel.send(`Problem loading ${cmd}: ${err}`).then(
      response => response.delete(1000).catch(error => console.log(error.stack))
    ).catch(error => console.log(error.stack));
  }
  message.channel.send(`${cmd} reload was succesful!`).then(
    response => response.delete(1000).catch(error => console.log(error.stack))
  ).catch(error => console.log(error.stack));
};
exports.reload = reload;










// client.on('message', (message) => {
//   let prefix = settings.prefix
//
//   if (message.author.bot) return;
//   if (!message.content.startsWith(prefix)) return;
//
//   let command = message.content.toLowerCase().split(' ')[0];
//   command = command.slice(prefix.length);
//
//   let args = message.content.split(' ').slice(1);
//   var argresult = args.join(' ');
//
//   let channel = message.channel
//   let author = message.author
//   let server = message.guild
//   let avatar = client.user.avatarURL;
//   let uvatar = author.avatarURL
//
//
//   if (command === 'nick' & message.author.id === '124989722668957700') {
//     client.user.setUsername(argresult)
//       .then(user => console.log(`My new username is ${user.username}`))
//       .catch(console.error);
//     } else
//
//   if (command === 'info' || command === 'help') {
//     channel.send('No embed yet so no help.')
//       .then(message => console.log(`send message: ${message.content}`))
//       .catch(console.error);
//   } else
//
//   if (command === 'embed') {
//     const embed = new Discord.RichEmbed()
//       .setColor(0x00AE86)
//       .setFooter(`Requested by ${author.username}`, uvatar)
//       .setThumbnail(avatar)
//       .setDescription(argresult)
//       .setTimestamp();
//     channel.send({embed})
//     .then(message => console.log('send embed: ${message.content}'))
//     .catch(console.error);
//   };
//
// });


  //login
  client.login(settings.token);
  // client.user.setStatus(settings.status)
