const main = require('../app.js');
const settings = require('../config/settings.json')
let utilAdmin = require(`../util/isadmin`)
exports.run = function(client, message, args, argresult) {
  if (utilAdmin.isAdmin(client, message, args, argresult)) {
    let cmd = argresult;
    main.reload(message, cmd)
  } else {
    message.channel.send('You have no permission to execute this command')
  }
};
