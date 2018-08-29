const { spawn } = require('child_process')
const fs = require('fs')
const logger = require('../utils/logger')

class Launcher {

  constructor(options) {
    this._options = options

    this._proc = null
    this._exec = null

    this._onProcessClose = this._onProcessClose.bind(this)
  }

  prepare() {
    this._exec = this._buildCommand(this._options)

    if (!this._exec) {
      logger.error('no node entry specified')
      return false
    }

    return true
  }

  start() {
    if (this._proc) return

    logger.info('starting command:', logger.color.white(this._exec))

    this._proc = spawn(this._exec, {
      shell: true,
      stdio: 'inherit'
    })

    this._proc.on('close', this._onProcessClose)
  }

  stop() {
    if (!this._proc) return

    this._proc.removeAllListeners()

    this._proc.kill()
    this._proc = null
  }

  restart() {
    this.stop()
    this.start()
  }

  _onProcessClose(code = null, signal = null) {
    const info = 'code = ' + code + (signal ? ', signal = ' + signal : '')
    const log = code === 0 ? logger.warn : logger.error

    log('process closed:', logger.color.white(info))

    this._proc = null
  }

  _buildCommand(options = {}) {
    if (options.exec) return options.exec

    let entry = options.entry ? options.entry : this._getPackageMain()

    return entry ? `node ${JSON.stringify(entry)}` : null
  }

  _getPackageMain() {
    try {
      const json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      return json.main || null
    } catch (error) {
      logger.warn('unable to find package.main')
      return null
    }
  }

}

module.exports = Launcher
