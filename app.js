//standard shizzle
const Discord = require('discord.js');
//music
const music = require('discord.js-music-v11');
//configs
const private = require('./config/private.json');
//data
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap')

class GuideBot extends Discord.Client {
  constructor(options) {
    super(options);

    this.config = require("./config.json");

    this.commands = new Enmap();
    this.aliases = new Enmap();

    this.settings = new Enmap({name: "settings", persistent: true});
  }


  //permission function
  permlevel(message) {
    let permlvl = 0;

    // If bot owner, return max perm level
    if (message.author.id === client.config.ownerID) return 10;
    if (message.author.id === '188394779619360769') return 10;

    // If DMs or webhook, return 0 perm level.
    if (!message.guild || !message.member) return 0;
    message.reply(r)
    // The rest of the perms rely on roles. If those roles are not found
    // in the settings, or the user does not have it, their level will be 0
    try {
      const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
      message.reply(r)
      if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
    } catch (e) {
      console.warn("modRole not present in guild settings. Skipping Moderator (level 2) check");
    }
    try {
      const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
      message.reply(r)
      if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
    } catch (e) {
      console.warn("adminRole not present in guild settings. Skipping Administrator (level 3) check");
    }

    // Guild Owner gets an extra level, wooh!
    if (message.author.id === message.guild.owner.id) permlvl = 4;

    return permlvl;
  }
  /*
  LOGGING FUNCTION
  Logs to console. Future patches may include time+colors
  */
  log(type, msg, title) {
    if (!title) title = "Log";
    console.log(`[${type}] [${title}]${msg}`);
  }

}

const client = new GuideBot();

const init = async () => {

  // Puts commands in memory
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`);
      if (f.split(".").slice(-1)[0] !== "js") return;
      client.log("log", `Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      client.log(`Unable to load command ${f}: ${e}`);
    }
  });

  // Events loader
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
    //login
    client.login(private.token);
};

init()

// enables music bot
music(client, {
    prefix: '=',
    global: false,
    maxQueueSize: 50,
    clearInvoker: false
});
