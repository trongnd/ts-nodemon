const chalk = require('chalk').default
const notifier = require('node-notifier')

const log = color => (...args) => {
  console.log(
    chalk.bgMagenta.white('[ts-nodemon]'),
    color(...args)
  )
}

const notify = (title = '', message = '') => {
  notifier.notify({
    title: `[ts-nodemon] ${title}`,
    message
  })
}

module.exports = {
  notify,

  color: chalk,
  log: console.log.bind(console),
  info: log(chalk.bold.blue),
  success: log(chalk.bold.green),
  warn: log(chalk.bold.yellow),
  error: log(chalk.bold.red),
}

