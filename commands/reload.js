const main = require('../app.js');
exports.run = function(client, message, args, argresult) {
  let cmd = argresult;
  main.reload(message, cmd);
};
