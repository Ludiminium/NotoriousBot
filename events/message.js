const chalk = require('chalk')
const settings = require('../config/settings.json')
module.exports = message => {
  let prefix = settings.prefix

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');

  let client = message.client
  let channel = message.channel
  let author = message.author
  let server = message.guild
  let avatar = client.user.avatarURL;
  let uvatar = author.avatarURL

  try {
    let cmdFile = require(`../commands/${command}`)
    cmdFile.run(client, message, args, argresult);
  } catch (err) {
    console.log(chalk.red(`Command ${command} failed to execute\n${err.stack}`));
  }

}
