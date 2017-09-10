const { inspect } = require("util");

exports.run = async (client, message, [action, key, ...value], level) => {

  // Retrieve current guild settings
  const settings = client.settings.get(message.guild.id);

  // First, if a user does `-set edit <key> <new value>`, let's change it
  if (action === "edit") {
    if (!key) return message.reply("Please specify a key to edit");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    if (value.length < 1) return message.reply("Please specify a new value");

    // `value` being an array, we need to join it first.
    settings[key] = value.join(" ");

    // One the settings is modified, we write it back to the collection
    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully edited to ${value.join(" ")}`);
  } else
  if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    message.reply(`The value of ${key} is currently ${settings[key]}`);
  } else {
    message.channel.send(inspect(settings), {code: "json"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: 3
};

exports.help = {
  name: "settings",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>"
};
