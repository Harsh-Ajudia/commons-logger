const path = require('path')
const { createLogger } = require('winston')
let timeOut
let _winstonConsole
// default config
global.__winstonConfig = {
    serviceName: "commons-logger",
    localLevel: null,
    rotationFrequency: "1d",
    globalLevel: 'info',
    writeLogsToFile: true,
    basePath: '/devopsmount'
}

const init = () => {
    let {
        consoleTransport,
        errorTransport,
        warnTransport,
        infoTransport,
        httpTransport,
        verboseTransport,
        debugTransport,
        sillyTransport
    } = require('./transports')
    _winstonConsole = consoleTransport

    const transporter = [
        _winstonConsole
    ]
    
    if (__winstonConfig.writeLogsToFile) {
        transporter.push(errorTransport)
        transporter.push(warnTransport)
        transporter.push(infoTransport)
        transporter.push(httpTransport)
        transporter.push(verboseTransport)
        transporter.push(debugTransport)
        transporter.push(sillyTransport)
    }
    
    const _logger = createLogger({
        transports: transporter,
        level: __winstonConfig.localLevel ? __winstonConfig.localLevel : __winstonConfig.globalLevel,
        defaultMeta: {
            service: __winstonConfig.serviceName,
        }
    })
    
    _logger.stream = {
        write: (stream) => {
            _logger.info(stream)
        }
    }
    return {
        error: (message) => {
            _logger.log({
                level: 'error',
                message: getMessage(message)
            })
        },
        warn: (message) => {
            _logger.log({
                level: 'warn',
                message: getMessage(message)
            })
        },
        info: (message) => {
            _logger.log({
                level: 'info',
                message: getMessage(message)
            })
        },
        http: (message) => {
            _logger.log({
                level: 'http',
                message: getMessage(message)
            })
        },
        log: (message) => {
            _logger.log({
                level: 'verbose',
                message: getMessage(message)
            })
        },
        debug: (message) => {
            _logger.log({
                level: 'debug',
                message: getMessage(message)
            })
        },
        silly: (message) => {
            _logger.log({
                level: 'silly',
                message: getMessage(message)
            })
        }
    }
}

const changeLevel = (level, timeOutPeriod) => {
    const before = _winstonConsole.level
    _winstonConsole.level = level

    clearTimeout(timeOut)
    if (timeOutPeriod) {
        timeOut = setTimeout(() => {
            _winstonConsole.level = before
            console.log('Log level has been reset')
        }, timeOutPeriod)
    }
    return {
        before,
        after: _winstonConsole.level
    }
}

const setConfig = (config) => {
    // Also needs to be improved via validation
    global.__winstonConfig = config
}

const fileLog = (fileInfo) => {
    if (__winstonConfig.writeLogsToFile) {
        const fs = require('fs')
        fs.writeFileSync(path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'info', 'fs-module.log'), fileInfo)
    }
}

const getMessage = message => {
    const _type = typeof message
    switch (_type) {
        case "string":
            return message

        case "object":
            return JSON.stringify(message)

        default:
            return JSON.stringify(message)
    }
}

module.exports = {
    fileLog,
    changeLevel,
    setConfig,
    winstonInit: init
}