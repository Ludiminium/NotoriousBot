const chalk = require('chalk');
const settings = require('../config/settings.json')
module.exports = client => {
  console.log(chalk.bgGreen.black(`I'm ready`));
  client.user.setGame(settings.prefix)
};
