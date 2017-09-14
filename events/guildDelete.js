module.exports = (client, guild) => {
  // removes guild from settings.
  client.settings.delete(guild.id);
};
