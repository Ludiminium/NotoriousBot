const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./config/settings.json');
// const ddiff = require('return-deep-diff');
const chalk = require('chalk')
const token = require('./config/token.json');
const music = require('discord.js-music-v11');
const http = require('http');

//events
require('./util/eventLoader.js')(client);

//reload commands
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

// music
music(client, {
    prefix: settings.prefix,
    global: settings.global,
    maxQueueSize: settings.maxQueueSize,
    clearInvoker: settings.clearInvoker
});



  //login
  client.login(token.token);
  // client.user.setStatus(settings.status)
