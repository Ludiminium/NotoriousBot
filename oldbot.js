const Discord = require ('discord.js'); //geeft aan welke libaries gehaald moeten worden
const client = new Discord.Client();
const music = require('discord.js-music-v11');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
const http = require('http');
const chalk = require('chalk'); //kleurtjes
const prefix = "%"; //prefix toewijzen

clbot.configure({botapi: "get faked nigger"}); //Stelt de cleverbot API code in die ik aangemaakt heb

    //music
music(client, {
	prefix: '%', //toevoeging voor de commando, prefix
	global: false, // server specifieke wachtlijsten
	maxQueueSize: 10, // maximale videos
	clearInvoker: false // of de bot berichten verwijdert die de music bot commando's uitvoeren
});

client.on('ready', () => { //wanneer de client aan gaat
    console.log(chalk.bgGreen(`[Start] ${new Date()}`)); //stuur datum in console met een groene kleurtje
});

    //welcome message
client.on('guildMemberAdd', member => { //wanneer een speler joint
    let guild = member.guild; //variabele guild is speler
    guild.defaultChannel.send(`Welcome ${member.user} !`); //stuur bericht "welkom gebruiker"
    console.log(chalk.bgYellow(`User joined: ${member.displayName}. Userid: ${member.user}`)); //stuurt bericht in console wie gejoined is met een leuke gele kleur
});

    //leave message
client.on('guildMemberRemove', member => { //wanneer een speler verlaat / gekickt wordt
    let guild = member.guild; //variabele guild is speler
    guild.defaultChannel.send(`Goodbye ${member.user}!`); //stuur "goodbye player"
    console.log(chalk.bgRed(`User removed: ${member.displayName}. Userid:${member.user}`)); //stuurt bericht wie weg is met een leuke rode kleur
});

client.on('message', message => { //wanneer er een bericht binnenkomt
        if (message.channel.id != "321678938852294656" || message.author.bot){ //Reageert alleen in een bepaald kanaal en reageert ook niet op zichzelf
        return; //bij return dan stopt de functie met uitvoeren
    }
    else { //anders
        clbot.write(message.content, (response) => { 
            message.channel.startTyping(); //begint met typen
            setTimeout(() => { //timeout instellen
            message.channel.send(response.output).catch(console.error); //stuurt bericht in de kanaal, als het fout gaat geef error in console
            message.channel.stopTyping(); //stopt met typen
            }, Math.random() * (1 - 3) + 1 * 1000); //random getal vermenigvuldigd met -2 plus 1 keer 1000
        });
    }
});

client.on('message', message => { //wanneer er een bericht binnenkomt
    let args = message.content.split(' ').slice(1); //verandert de string in een array en selecteert de elementen in de array
    var argresult = args.join(' '); //verandert de array elementen in een string
    var member= message.mentions.members.first(); //variabele member = eerste gementioned persoon
    
    if(!message.content.startsWith(prefix)) return; //als de bericht niet met prefix begint, return
    if (message.author.bot) return; //als de message verstuurder de bot is, return
    
    //help
    if (message.content.startsWith(prefix + 'help')) { //als message begint met help, stuur dit
    var ava = client.user.avatarURL; //varabele ava is de avatar van de gebruiker
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86) //stelt de kleur in
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL) //footer instellen met de username en foto van de auteur
    .setThumbnail(ava) //thumbnail van de bot erbij, hieronder de help menu tekst
    .setDescription("**Bot help** \n\n **/ping** - Ping command \n **/userid** - Laat je userid zien \n **/channelid** - Laat de id van de kanaal zien \n **/setgame [game]** - Stelt spel in \n **/kick [@user]** - Stuurt persoon uit de server \n **/count [nummer t/m 10]** - Telt tot een zelf aangegeven getal \n **/rev [tekst]** - Draait je tekst om \n **/weather [stad]** - geeft de weer van de aangegeven stad \n **/steam [64-bit userid]** - Laat de steamprofiel zien \n **/delete [aantal]** - Verwijdert berichten, max 2 weken oud \n\n\n **Musicbot help** \n\n **/play [search string / youtube url]** - Speelt aangegeven video af \n **/skip [aantal]** - Slaat aantal videos over. Default aantal is 1 \n **/pause** - Pauzeert de video \n **/resume** - Hervat de video \n **/volume [aantal]** - Stelt de volume in \n **/leave** - Laat de bot de voice channel verlaten en leegt de queue \n **/clearqueue** - Maakt de queue leeg \n\n\n **Cleverbot help** \n\n In <#321678938852294656> kan je praten tegen cleverbot.")
    .setTimestamp(); //voegt de tijd toe in de footer
    message.channel.send({embed}); //verstuurt de embed
    }
    
    //ping
    if (message.content.startsWith(prefix + 'ping')) { //als message begint met dit, stuur dit
        message.reply(`pong: \`${Date.now() - message.createdTimestamp} ms\``); // de datum van nu minus de message dat de message gemaakt is
    }
    
    //channel id voor het testen
    if (message.content.startsWith(prefix + 'channelid')) { //als bericht hiermee start
        message.reply('<#' + message.channel.id + '>');  //geef dan de channel id tussen de twee strings
    }
    
    //userid voor het testen
    if (message.content.startsWith(prefix + 'userid')) { //als bericht begint met id
        message.reply(`Your user id: \`${message.author.id} \``); //geef id van de auteur van de message
        message.channel.send("<@" + message.author.id + ">"); //geef dan de user id tussen de twee strings
    }
    
    //setgame
    if (message.content.startsWith(prefix + 'setgame')) { //als bericht begint met setgame
            if (!argresult) argresult = null; //als er geen argresult, dan is argresult null
            client.user.setGame(argresult); //zet de spelende spel als argresult
		    message.channel.send(`Game set to` + argresult +`.`); //print het string met argresult
    }
    
    //kick
    if (message.content.startsWith(prefix + 'kick')) { //als de inhoud van het bericht start met kick
        member.kick().then((member) => { //kick de speler en dan
        message.channel.send(member.displayName + " has been kicked!"); //stuur dit bericht
        }).catch(() => { //als het fout gaat
        message.reply("no perms scrub"); //stuur dan dit bericht
        });
    }
    
    //delete
    if (message.content.startsWith(prefix + 'delete')) { //als bericht hiermee begint
        message.channel.bulkDelete(argresult);  //verwijdert de aangegeven aantal berichten
    }
    
    //count
    if (message.content.startsWith(prefix + "count")){ //als inhoud van de bericht begint met count
        if(argresult <= 10){ //als argresult onder 10 is (spam preventie)
            var x=0; //variabele x stellen aan nul
            for(x=0; x <= argresult; x++){ //for loop, telt x op tot de getal dat genoemd is in de commando
                message.channel.send(x); //stuur de waarde van x in de chat
            }
        }
        else if(argresult <=0){ //anders als de genoemde getal kleiner is dan 0
            message.reply("no negative numbers"); //stuur dit terug
        }
        else {
            message.reply("dont try to spam my server"); //anders als de genoemde getal groter is dan 10
        }
        message.reply("Finished!"); //reageer met dit
    }
    
    //reverse
	if (message.content.startsWith(prefix + 'rev')) { //als de inhoud van het bericht begint met rev
		var rev = ''; //variabele rev aan een lege string stellen
		var p = argresult.length; //variabele p is de aantal letters van de gegeven woord
		
		while (p > 0) { //terwijl p groter is dan 0
			rev += argresult.substring(p - 1, p); //tel variabele rev op met de letters tussen p minus 1 en p
			p--; //trek 1 af van p
		}
		message.reply(rev); //reageer met de omgedraaide woord
	}

	//weather
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
    
    //steamprofile
    function printProfile(profileurl, name, avatarfull, unox, num ) { //functie voor steam gegevens uit printen
        const embed = new Discord.RichEmbed()
        .setColor(0x00AE86) //stelt kleur in
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
        .setThumbnail(avatarfull)
        .setTimestamp()
        .setDescription("**Profileurl**\n" + profileurl + "\n\n**Logged off at** \n" + unox + "\n\n**Status** \n" + num)
        .setTitle("**Profile of " + name + "**");
        message.channel.send({embed});
    }
    
    //steamstatus
    function printPersonastate(num) { //bij bepaalde waardes een string outputten
        if(num==0) return 'Offline or private profile';
        if(num==1) return 'Online';
        if(num==2) return 'Busy';
        if(num==3) return 'Away';
        if(num==4) return 'Snooze';
        if(num==5) return 'Looking to trade';
        if(num==6) return 'Looking to play';
    }

    //unix to time stamp
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

    //windrichting berekener
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

    //error output
    function printError(error) { //functie om de error bericht te sturen
        console.error(error.message); //net als console.log maar dan voor errors
    }

    module.exports = { //weather api parse function
        weather: function get(city){
        //van dit json file de data halen
            var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=95dcf7b6a21897a585ce210222415fee&units=metric', function(response) {
                var body = ''; //body aan een lege string stellen

                response.on('data', function(chunk) { //op antwoord met data, voer dit uit
                    body += chunk; //haalt data op
                });
                response.on('end', function() { //wanneer antwoord eindigd, voer dit uit
                    if (response.statusCode === 200) { //als de statuscode 200 is, dan
                        try{
                            var weatherAPI = JSON.parse(body); //parset de body van de json file
                            //voert functie printweather uit met de genomen waardes uit de json file. weatherAPI.weather zat in een array, eerste array geselecteerd
                            printWeather(weatherAPI.name, weatherAPI.main.temp, weatherAPI.wind.speed, weatherAPI.weather[0].icon, weatherAPI.sys.country, weatherAPI.weather[0].main, weatherAPI.weather[0].description);
                            printDirection(weatherAPI.wind.deg); //voer functie printdirection uit met de geparsed data uit json file
                        } 
                        catch(error) { //bij een error voer dit uit
                            printError(error); //voert functie printError uit met de error
                        }
                    } else {
                        //anders als de statuscode niet 200 is, print dan de gegeven status code
                        message.reply('Couldnt find the weather from: **' + city + '** Error code: (' + http.STATUS_CODES[response.statusCode] + ')');
                    }
                });
            });
            request.on('error', function (err) { //wanneer er een error is met de request
                printError(err); //voert printerror functie uit
            });
        },  //steamapi parse function
        steam: function get(steamid){
            var request = http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4BD46DBBFAE792E942EDAD286468B207&steamids=' + steamid, function(response) {
                var body = '';
                response.on('data', function(chunk) { //op antwoord met data, voer dit uit
                body += chunk; //haalt data op
                });
                response.on('end', function() { //wanneer antwoord eindigd, voer dit uit
                    if (response.statusCode === 200) { //als de statuscode 200 is, dan
                        try{
                            var steamAPI = JSON.parse(body); //parset de body van de json file
                            printProfile(steamAPI.response.players[0].profileurl, steamAPI.response.players[0].personaname, steamAPI.response.players[0].avatarfull, printTime(steamAPI.response.players[0].lastlogoff), printPersonastate(steamAPI.response.players[0].personastate)); //voert deze functies uit
                            console.log(printPersonastate(steamAPI.response.players[0].personastate)); //test voor bug controle
                        }
                        catch(error) { //bij een error voer dit uit
                            printError(error); //voert functie printError uit met de error
                        }
                    } else {
                        message.reply('Couldnt find the profileurl from steamid: **' + steamid + '** Error code: (' + http.STATUS_CODES[response.statusCode] + ')');
                    }
                });
            });
            request.on('error', function (err) { //wanneer er een error is met de request
            printError(err); //voert printerror functie uit
            });
        }
    };
    
    //weather command
    if (message.content.startsWith(prefix + 'weather')) { //als bericht begint met prefix + weather
	    module.exports.weather(argresult); //voer dan dit functie uit met de aangegeven variabele
    }
    
    //steamprofile command
    if (message.content.startsWith(prefix + 'steam')) {
        module.exports.steam(argresult);
    }
    
});

client.login('why are you reading this'); //logt in met dit token