module.exports = async client => {
  setTimeout(filter,1000)
  function filter() {
    client.log("log", `Ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");

    client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
  }
};

// module.exports = client => {
//   client.guildCreateTimeout()
//   client.log("log", `Ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");
//   client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
// }
