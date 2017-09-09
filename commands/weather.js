const http = require('http');
const weather = require('../util/weather')
exports.run = function(client, message, args, argresult) {
		var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + argresult + '&appid=95dcf7b6a21897a585ce210222415fee&units=metric', function(response) {
		var body = '';
			response.on('data', function(chunk) {
				body += chunk;
			});
			response.on('end', function() {
				if (response.statusCode === 200) {
					try{
						var weatherAPI = JSON.parse(body);
						weather.printWeather(weatherAPI.name, weatherAPI.main.temp, weatherAPI.wind.speed, weatherAPI.weather[0].icon, weatherAPI.sys.country, weatherAPI.weather[0].main, weatherAPI.weather[0].description);
						weather.printDirection(weatherAPI.wind.deg);
					} catch(error) {
						weather.printError(error);
					}
				}	else {
					message.reply('Couldnt find the weather from: **' + argresult + '** Error code: (' + http.STATUS_CODES[response.statusCode] + ')');
				}
			});
		});
		request.on('error', function (err) {
			printError(err);
		});
};
