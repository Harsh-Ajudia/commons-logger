
const { transports, format } = require('winston')
require('winston-daily-rotate-file')
const path = require('path')
const { timeZone } = require('./common')

const getDateFormat = (frequency = '1d') => {
    const formats = {
        'h': 'YYYY-MM-DD-THH-mm',
        'd': 'YYYY-MM-DD',
        'w': 'YYYY-MM-w',
        'M': 'YYYY-MM'
    }
    if (formats[frequency.slice(-1)]) {
        return formats[frequency.slice(-1)]
    } else {
        return 'YYYY-MM-DD'
    }
}

const common = {
    datePattern: getDateFormat(__winstonConfig.rotationFrequency),
    frequency: __winstonConfig.rotationFrequency,
    zippedArchive: true,
    maxFiles: '14d'
}

const consoleTransport = new transports.Console({
    level: __winstonConfig.localLevel ? __winstonConfig.localLevel : __winstonConfig.globalLevel,
    format: format.combine(
        format.label({ label: `[${__winstonConfig.serviceName}]` }),
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((data) => `${data.level.toUpperCase()}\t${data.timestamp}\t: ${data.message}`)
    ),
    json: true
})
const errorTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'error', '%DATE%.log'),
    ...common,
    level: 'error',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((errorMessage) => `${errorMessage.level.toUpperCase()}\t${errorMessage.timestamp}\t: ${errorMessage.message}`)
    )
})
const warnTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'warn', '%DATE%.log'),
    ...common,
    level: 'warn',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((warnMessage) => `${warnMessage.level.toUpperCase()}\t${warnMessage.timestamp}\t: ${warnMessage.message}`)
    )
})
const infoTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'info', '%DATE%.log'),
    ...common,
    level: 'info',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((infoMessage) => `${infoMessage.level.toUpperCase()}\t${infoMessage.timestamp}\t: ${infoMessage.message}`)
    )
})
const httpTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'http', '%DATE%.log'),
    ...common,
    level: 'http',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((httpMessage) => `${httpMessage.level.toUpperCase()}\t${httpMessage.timestamp}\t: ${httpMessage.message}`)
    )
})
const verboseTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'verbose', '%DATE%.log'),
    ...common,
    level: 'verbose',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((verboseMessage) => `${verboseMessage.level.toUpperCase()}\t${verboseMessage.timestamp}\t: ${verboseMessage.message}`)
    )
})
const debugTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'debug', '%DATE%.log'),
    ...common,
    level: 'debug',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((debugMessage) => `${debugMessage.level.toUpperCase()}\t${debugMessage.timestamp}\t: ${debugMessage.message}`)
    )
})
const sillyTransport = new transports.DailyRotateFile({
    filename: path.resolve(__winstonConfig.basePath, __winstonConfig.serviceName, 'logs', 'silly', '%DATE%.log'),
    ...common,
    level: 'silly',
    format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json(),
        format.printf((sillyMessage) => `${sillyMessage.level.toUpperCase()}\t${sillyMessage.timestamp}\t: ${sillyMessage.message}`)
    )
})

module.exports = {
    consoleTransport,
    errorTransport,
    warnTransport,
    infoTransport,
    httpTransport,
    verboseTransport,
    debugTransport,
    sillyTransport
}