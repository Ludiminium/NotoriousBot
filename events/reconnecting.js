const chalk = require('chalk');
module.exports = client => {
  console.log(chalk.bgYellow.black(`Reconnecting at ${new Date()}`))
}
