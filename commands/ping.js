exports.run = function(client, message, args, argresult) {
  message.channel.send(`pong: \`${Date.now() - message.createdTimestamp} ms\``);
};
// let m = await message.channel.send("Ping?");
// m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
