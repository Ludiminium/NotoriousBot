client.on('message', (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');

  let channel = message.channel

  if (command === 'nick' & message.author.id === '124989722668957700') {
    client.user.setUsername(argresult)
      .then(user => console.log(`My new username is ${user.username}`))
      .catch(console.error);
    };

  if (command === 'rape') {
    channel.send(`You just raped ${argresult}`)
      .then(message => console.log(`send message: ${message.content}`))
      .catch(console.error);
  };

});
