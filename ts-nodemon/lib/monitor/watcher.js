const fs = require('fs')
const EventEmitter = require('events')
const ts = require('typescript')
const logger = require('../utils/logger')

const FORMAT_HOST = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
}

class Watcher extends EventEmitter {

  constructor(options) {
    super()

    this._options = this._withDefaultOptions(options)

    this._configFile = null
    this._error = null
  }

  prepare() {
    const configFile = ts.findConfigFile(
      this._options.project,
      ts.sys.fileExists,
      this._options.tsconfig
    )

    if (!configFile) {
      logger.error(`no "${this._options.tsconfig}" found.`)
      return false
    }

    try {
      // check valid json
      JSON.parse(fs.readFileSync(configFile))
    } catch (error) {
      logger.warn(`invalid "${this._options.tsconfig}" file format.`)
    }

    this._configFile = configFile

    return true
  }

  start() {
    const createProgram = ts.createSemanticDiagnosticsBuilderProgram

    const host = ts.createWatchCompilerHost(
      this._configFile,
      {},
      ts.sys,
      createProgram,
      this._reportDiagnostic.bind(this),
      this._reportWatchStatusChanged.bind(this)
    )

    const hostCreateProgram = host.createProgram
    host.createProgram = (
      rootNames,
      options,
      host,
      oldProgram
    ) => {
      this.emit('build.start')

      return hostCreateProgram(rootNames, options, host, oldProgram)
    }

    const hostAfterProgramCreate = host.afterProgramCreate
    host.afterProgramCreate = program => {
      hostAfterProgramCreate(program)

      if (this._error) {
        const formattedError = ts.formatDiagnosticsWithColorAndContext([this._error], FORMAT_HOST)
        this.emit('build.error', formattedError, this._error)

        this._error = null
      } else {
        this.emit('build.finish')
      }
    }

    ts.createWatchProgram(host)
  }

  stop() {
    // TODO
  }

  _withDefaultOptions(options) {
    options = Object.assign({}, options)

    if (!options.project) {
      options.project = '.'
    }

    if (!options.tsconfig) {
      options.tsconfig = 'tsconfig.json'
    }

    return options
  }

  _reportDiagnostic(diagnostic) {
    this._error = diagnostic
  }

  _reportWatchStatusChanged(diagnostic) {
    // logger.log('diagnostic', diagnostic)
  }

}

module.exports = Watcher
