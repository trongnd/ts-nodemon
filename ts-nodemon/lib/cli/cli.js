const minimist = require('minimist')
const Monitor = require('../monitor')
const logger = require('../utils/logger')
const package = require('../../package.json')

logger.info(logger.color.bgMagenta.white('version:', package.version))

start()

function start() {
  const argv = minimist(process.argv.slice(2))

  if (argv.help) {
    return printUsage()
  }

  const options = {
    project: argv.project || null,
    tsconfig: argv.tsconfig || null,
    entry: argv.entry || null,
    exec: argv.exec || null
  }

  const monitor = new Monitor(options)

  if (!monitor.start()) process.exit(1)
}

function printUsage() {
  const command = 'ts-nodemon' +
    ' --project <project>' +
    ' --tsconfig <tsconfig>' +
    ' --entry <entry>' +
    ' --exec <exec>'

  logger.info('Usage:')
  logger.success(' ', logger.color.magenta(command))
  logger.info('Args:')
  logger.warn('  project:  ', logger.color.white('will be passed as "tsc --project <project>"'))
  logger.warn('            ', logger.color.white('optional, default:'), logger.color.yellow('.'))
  logger.warn('  tsconfig: ', logger.color.white('tsconfig file name'))
  logger.warn('            ', logger.color.white('optional, default:'), logger.color.yellow('tsconfig.json'))
  logger.warn('  entry:    ', logger.color.white('JS entry file will be run by NodeJS'))
  logger.warn('            ', logger.color.white('optional, default: "main" field in "package.json"'))
  logger.warn('  exec:     ', logger.color.white('specify a custom command to run'))
  logger.warn('            ', logger.color.white('optional'))
}
