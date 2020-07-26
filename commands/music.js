const ytdl = require('ytdl-core-discord');
const https = require('https');
const private = require('../config/private.json');
const Discord = require('discord.js');
/*
const queue = new Map();
var body = '';

async function execute(argument,serverQueue,message){
  const voiceChannel = message.member.voice.channel;

  //create music queue, server unique
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: message.member.voice.channel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
  };

    queue.set(message.guild.id, queueConstruct);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
  serverQueue.songs.push(song);
  return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function play(guild,song){
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
}

*/

function printError (e) {
	console.error(e.stack);
}

async function play(connection, url) {
  connection.play(await ytdl(url), { type: 'opus' });
}

function stop(voiceChannel){
  voiceChannel.leave();
}

function skip(){

}

exports.run = async (client, message, args, level) => {

  async function execute(argument){
    function printSong(title,thumbnail) {
  		const embed = new Discord.MessageEmbed()
  		.setColor('0x00AE86')
  		.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
  		.setTimestamp()
  		.setThumbnail(thumbnail)
  		.addFields(
  			{ name: "**Title**", value: title}
      )
  		.setTitle("Music");
  		message.channel.send({embed});
  	}
      var videoArgs = { type: 'opus', filter: "audioonly"};
      argument.shift();
      var videoURL = argument.join("%20");
      var request = https.get(`https://www.googleapis.com/youtube/v3/search?q=${videoURL}&part=snippet&maxResults=1&key=${private.youtubeAPIkey}`,
          function(response) {
            var body = '';
            response.on('data', function(chunk) {
              body += chunk;
            });
              response.on('end', function() {
                  if (response.statusCode === 200) {
                      try{
                          var youtubeAPI = JSON.parse(body);
                          var videoID = youtubeAPI.items[0].id.videoId;
                          var url = "https://www.youtube.com/watch?v=" + videoID;
                          play(connection, url);
                          printSong(youtubeAPI.items[0].snippet.title, youtubeAPI.items[0].snippet.thumbnails.default.url);

                      }
                      catch(error) {
                          printError(error);
                      }
                  }
              });
              request.on('error', function (err) {
                console.log(chalk.red(`Music failed to execute\n${err.stack}`));
              });
          }
      );
  }

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const connection = await voiceChannel.join();
  if(args[0] == "play"){
    execute(args);
  } else if (args[0] == "stop"){
    stop(voiceChannel);
  } else if (args[0] == "skip"){
    skip(argument, serverQueue);
  } else if (args[0] == "np"){
    now_playing();
  }else{
    message.reply("No arguments or invalid arguments (" + args + ") specified.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "music",
  category: "Miscellaneous",
  description: "Play songs in voice channels.",
  usage: "music help"
};
