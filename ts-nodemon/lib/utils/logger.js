const chalk = require('chalk').default

const log = color => (...args) => {
  console.log(
    chalk.bgMagenta.white('[ts-nodemon]'),
    color(...args)
  )
}

module.exports = {
  color: chalk,
  log: console.log.bind(console),
  info: log(chalk.bold.blue),
  success: log(chalk.bold.green),
  warn: log(chalk.bold.yellow),
  error: log(chalk.bold.red),
}

