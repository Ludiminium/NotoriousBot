const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
var temp = require("pi-temperature");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
	temp.measure(function(err, temp) {
	    if (err) console.error(err);
	    else {
				const embed = new Discord.MessageEmbed()
				.setColor('#FFFFFF')
				.setTitle('Bot Statistics')
				.setURL('https://github.com/Ludiminium/notorious-bot')
				.setThumbnail('https://i1.sndcdn.com/artworks-000405842826-vea9na-t500x500.jpg')
				.addFields(
					{ name: 'Raspberry Pi 3', value: 'Model B Rev 1.2, hosted locally' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
			    { name: 'Uptime', value: duration, inline: true },
			    { name: 'Temperature', value: `${temp} °C`, inline: true },
			    { name: 'Servers', value: `${client.guilds.cache.size.toLocaleString()}`, inline: true },
			    { name: 'Channels', value: `${client.channels.cache.size.toLocaleString()}`, inline: true },
					{ name: 'Users', value: `${client.users.cache.size.toLocaleString()}`, inline: true },
			    { name: 'Discord.js version', value: `v${version}`, inline: true },
					{ name: 'Node.js version', value: `${process.version}`, inline: true }
				)
				.setTimestamp()
				.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
				message.channel.send(embed);
		};
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "stats",
  category: "Miscellaneous",
  description: "Only for nerds",
  usage: "stats"
};
