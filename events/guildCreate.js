module.exports = (client, guild) => {
  //add to settings
  client.settings.set(guild.id, client.config.defaultSettings);
};
