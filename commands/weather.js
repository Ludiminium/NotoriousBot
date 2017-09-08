const http = require('http');
exports.run = function(client, message, args, argresult) {

	function printTime(unox){
		var a = new Date(unox * 1000); //unix datum keer 1000
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; //var months een array met alle maanden aantstellen
		var year = a.getFullYear(); //haalt de datum van dit moment op
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var knakworst = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ; //alle variabelen samenvoegen in een string
		return knakworst; //stuurt string in dd/mm/yyyy format terug
	}

	function printDirection(degree){ //vult de waarde van wind.deg in en geeft de string afhangend van waarde
		if(degree>337.5) return 'North'; //als degree groter is dan dit getal, stop functie en geef dit string
		if(degree>292.5) return 'North West';
		if(degree>247.5) return 'West';
		if(degree>202.5) return 'South West';
		if(degree>157.5) return 'South';
		if(degree>122.5) return 'South East';
		if(degree>67.5) return 'East';
		if(degree>22.5)return 'North East';
		return 'North';
	}

	function printError(error) { //functie om de error bericht te sturen
		console.error(error.message); //net als console.log maar dan voor errors
	}

	function printWeather(city, temp, windspeed, png, country, main, description, degree) { //functie om de weer uit te printen
		const embed = new Discord.RichEmbed()
		.setColor(0x00AE86) //stelt kleur in
		.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL) //jouw naam en avatar foto bij footer
		.setTimestamp() //datum bij footer
		.setThumbnail("http://openweathermap.org/img/w/" + png + ".png") //thumbnail met foto van weer (wolkjes)
		.setDescription("**Temperature** \n" + temp + "°C\n\n**Wind speed** \n" + windspeed + "km/h \n\n**Wind Direction** \n" + printDirection(degree) + "\n\n**Weather condition** \n" + main + ", " + description + "\n\n")
		.setTitle("**Weather in " + city + ", " + country + "**"); //geeft aan met de embed van welk stad dit weer is
		message.channel.send({embed}); //reageer met de variabele met de gegevens
	}

	module.exports = {
		weather: function get(city){
			var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=95dcf7b6a21897a585ce210222415fee&units=metric', function(response) {
				var body = '';
					response.on('data', function(chunk) {
						body += chunk;
					});
				response.on('end', function() {
					if (response.statusCode === 200) {
						try{
							var weatherAPI = JSON.parse(body);
							printWeather(weatherAPI.name, weatherAPI.main.temp, weatherAPI.wind.speed, weatherAPI.weather[0].icon, weatherAPI.sys.country, weatherAPI.weather[0].main, weatherAPI.weather[0].description);
							printDirection(weatherAPI.wind.deg);
						} 
						catch(error) {
							printError(error);
						}
					}
					else {
						message.reply('Couldnt find the weather from: **' + city + '** Error code: (' + http.STATUS_CODES[response.statusCode] + ')');
					}
				});
			});
			request.on('error', function (err) {
				printError(err);
			});
		}
	};
};