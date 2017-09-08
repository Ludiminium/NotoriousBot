const chalk = require('chalk');
module.exports = client => {
  console.log(chalk.bgOrange.black(`Reconnecting at ${new Date()}`))
}
