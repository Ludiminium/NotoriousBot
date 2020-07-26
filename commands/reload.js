exports.run = async (client, message, args, level) => {
  if (!args || args.size < 1) return message.reply("Please enter a command to reload");

  let command;
  if (client.commands.has(args[0])) {
    command = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) {
    command = client.commands.get(client.aliases.get(args[0]));
  }
  if (!command) return message.reply(`Couldn't find \`${args[0]}\``);
  command = command.help.name;

  delete require.cache[require.resolve(`./${command}.js`)];
  const cmd = require(`./${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
  });

  message.reply(`The command \`${command}\` has been reloaded`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command",
  usage: "reload [command]"
};
