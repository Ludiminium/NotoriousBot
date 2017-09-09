module.exports = {

  	printDirection: function (degree){
  		if(degree>337.5) return 'North';
  		if(degree>292.5) return 'North West';
  		if(degree>247.5) return 'West';
  		if(degree>202.5) return 'South West';
  		if(degree>157.5) return 'South';
  		if(degree>122.5) return 'South East';
  		if(degree>67.5) return 'East';
  		if(degree>22.5)return 'North East';
  		return 'North';
  	},

  	printError: function (error) {
  		console.error(error.message);
  	},

  	printWeather: function (argresult, temp, windspeed, png, country, main, description, degree) {
  		const embed = new Discord.RichEmbed()
  		.setColor(0x00AE86)
  		.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
  		.setTimestamp()
  		.setThumbnail("http://openweathermap.org/img/w/" + png + ".png")
  		.setDescription("**Temperature** \n" + temp + "�C\n\n**Wind speed** \n" + windspeed + "km/h \n\n**Wind Direction** \n" + printDirection(degree) + "\n\n**Weather condition** \n" + main + ", " + description + "\n\n")
  		.setTitle("**Weather in " + argresult + ", " + country + "**");
  		message.channel.send({embed});
  	}
}
