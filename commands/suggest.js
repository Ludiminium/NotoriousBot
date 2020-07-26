exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("purge");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "suggest",
  category: "Miscellaneous",
  description: "Lets you send suggestions to the developer",
  usage: "suggest <text>"
};
