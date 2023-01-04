const { winstonInit, setConfig, changeLevel } = require('./index')

const config = {
    serviceName: "common-logger",
    localLevel: null,
    rotationFrequency: "2h",
    globalLevel: 'silly',
    writeLogsToFile: true,
    basePath: '/devopsmount'
}

setConfig(config)
const logger = winstonInit()
// in your project use this as a global variable
// global.logger = winstonInit()

const printAll = (message) => {
    logger.error(message)
    logger.warn(message)
    logger.info(message)
    logger.http(message)
    logger.log(message)
    logger.debug(message)
    logger.silly(message)
}

const runTest = () => {

    console.log('Printing with level:', config.globalLevel)
    printAll('Config level')

    changeLevel('warn', 7200)
    console.log('\n\nPrinting with level: warn')
    printAll('Warning print')

    changeLevel('verbose', 7200)
    console.log('\n\nPrinting with level: verbose')
    printAll('Verbose print')
    // process.exit()
}

runTest()