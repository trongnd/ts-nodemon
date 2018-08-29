const logger = require('../utils/logger')
const Watcher = require('./watcher')
const Launcher = require('./launcher')

class Monitor {

  constructor(options = {}) {
    this._options = options

    this._watcher = null
    this._launcher = null

    this._onBuildStart = this._onBuildStart.bind(this)
    this._onBuildFinish = this._onBuildFinish.bind(this)
    this._onBuildError = this._onBuildError.bind(this)

    this._onProcessClose = this._onProcessClose.bind(this)

    this._onStdinData = this._onStdinData.bind(this)
  }

  start() {
    this._watcher = new Watcher(this._options)
    this._launcher = new Launcher(this._options)

    if (!this._watcher.prepare()) return false
    if (!this._launcher.prepare()) return false

    this._watcher.on('build.start', this._onBuildStart)
    this._watcher.on('build.finish', this._onBuildFinish)
    this._watcher.on('build.error', this._onBuildError)

    this._launcher.on('process.close', this._onProcessClose)

    this._watcher.start()

    process.stdin.on('data', this._onStdinData)

    return true
  }

  stop() {
    if (this._watcher) {
      this._watcher.removeAllListeners()
      this._watcher.stop()
      this._watcher = null
    }

    if (this._launcher) {
      this._launcher.stop()
      this._launcher = null
    }
  }

  _onStdinData(buffer) {
    const text = buffer.toString('utf8').trim()

    if (text === 'reset' || text === 'rs') {
      this._launcher.restart()
      return
    }
  }

  _onBuildStart() {
    logger.info('building source')
  }

  _onBuildFinish() {
    logger.success('build success')
    this._launcher.restart()
  }

  _onBuildError(formattedError, raw) {
    logger.error('build error')
    logger.log(formattedError)

    this._notify('build error', raw.messageText || null)
  }

  _onProcessClose(code, signal) {
    const info = 'code = ' + code + (signal ? ', signal = ' + signal : '')
    const log = code === 0 ? logger.warn : logger.error

    log('process closed:', logger.color.white(info))

    this._notify('process closed', info)
  }

  _notify(...args) {
    if (this._options.notify) logger.notify(...args)
  }

}

module.exports = Monitor
