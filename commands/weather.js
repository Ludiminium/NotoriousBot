const http = require('http');
const Discord = require('discord.js');
const private = require('../config/private.json');
const moment = require("moment");
require("moment-duration-format");

function printTime(timestamp){
	if(timestamp == NaN) {
		return 'No time';
	}
	else {
		var localtime = timestamp * 1000;
		var date = new Date(localtime);
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var time_string = hour + ':' + min + ':' + sec;
		return time_string;
	}
}
function printDirection(degree){
	if(degree>337.5) return 'North';
	if(degree>292.5) return 'North West';
	if(degree>247.5) return 'West';
	if(degree>202.5) return 'South West';
	if(degree>157.5) return 'South';
	if(degree>122.5) return 'South East';
	if(degree>67.5) return 'East';
	if(degree>22.5)return 'North East';
	return 'North';
}

function printError (e) {
	console.error(e.stack);
}

exports.run = (client, message, args, level)	=> {

	function printWeather(name,temp,feels_like,temp_min,temp_max,pressure,humidity,windspeed,winddegree,icon,weathername,weatherdescription,country,sunrise,sunset,timezone) {
		const embed = new Discord.MessageEmbed()
		.setColor('0x00AE86')
		.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
		.setTimestamp()
		.setThumbnail("http://openweathermap.org/img/w/" + icon + ".png")
		.addFields(
			{ name: "**Temperature**", value: Math.round(temp) + " °C, feels like " + feels_like +" °C\nMinimum temperature: " + temp_min + " °C\nMaximum temperature: " + temp_max + " °C"},
			{ name: "**Weather condition**", value: weathername + ", " + weatherdescription },
			{ name: "**Wind**", value: "Speed: " + windspeed + " km/h \nDirection: " + printDirection(winddegree) },
			{ name: "**Air pressure and humidity**", value: pressure + " hPa, " + humidity + "%"},
			{ name: "**Sunrise / Sunset**", value: printTime(sunrise) +" / "+ printTime(sunset) }
		)
		.setTitle("**Weather in " + name + ", " + country + "**");
		message.channel.send({embed});
	}

	var argresult = args.join(" ");

	var request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${argresult}&appid=${private.weatherAPIkey}&units=metric`, function(response) {
		var body = '';
			response.on('data', function(chunk) {
				body += chunk;
			});
		response.on('end', function() {
			if (response.statusCode === 200) {
				try{
					var weatherAPI = JSON.parse(body);
						printWeather(
							weatherAPI.name,
							weatherAPI.main.temp,
							weatherAPI.main.feels_like,
							weatherAPI.main.temp_min,
							weatherAPI.main.temp_max,
							weatherAPI.main.pressure,
							weatherAPI.main.humidity,
							weatherAPI.wind.speed,
							weatherAPI.wind.deg,
							weatherAPI.weather[0].icon,
							weatherAPI.weather[0].main,
							weatherAPI.weather[0].description,
							weatherAPI.sys.country,
							weatherAPI.sys.sunrise,
							weatherAPI.sys.sunset,
						);
					} catch(error) {
						printError(error);
					}
				}	else {
					console.log('Couldnt find the weather in: **' + argresult + '** Error code: (' + http.STATUS_CODES[response.statusCode] + ')');
					if (!argresult){
						message.reply('Please give a city as input')
					} else message.reply(`Couldn't find the weather of: ${argresult}, please try an other input` + http.STATUS_CODES[response.statusCode])
				}
			});
		});
		request.on('error', function (err) {
			console.log(chalk.red(`Weather failed to execute\n${err.stack}`));
		});
	}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "weather",
  category: "Miscellaneous",
  description: "Gives you the current weather in a given city.",
  usage: "weather city"
};
