## Commons Logger for application

### Quick Start

### Step 1: Import the package in your app init step

Note: The recommend way of using this logger is by initializing it in centralize way i.e. global way

```javascript
const { winstonInit, setConfig, changeLevel } = require('./index')

const config = {
    serviceName: "commons-logger",
    localLevel: null,
    globalLevel: 'info',
    rotationFrequency: "1d",
    writeLogsToFile: true,
    basePath: '/devopsmount'
}

// Only if you wanna change the default values
setConfig(config)
```

Supported config can be found in the table below

| **Config Key**    | **Default Value** | **Other Examples**                         | **Description**                                                                                                             |
|-------------------|-------------------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| serviceName       | commons-logger    | any service name                           | This is used as a reference if there are multiple apis or service                                                           |
| localLevel        | null              | error, warn, info, http, log, debug, silly | The temporary level to store when runtime level is changed                                                                  |
| globalLevel       | info              | error, warn, info, http, log, debug, silly | The default global level. If at runtime level is changed it will be defaulted to global                                     |
| rotationFrequency | 1d                | 2h, 1d, 1w, 1M                             | It consists of 2 parts: <number><period>. periods supported are: h \| d \| w \| M. hour, day, week, month respectively      |
| writeLogsToFile   | true              | true false                                 | If false it will only output to your console. If true it will also maintain the .log files in your persistent drive storage |
| basePath          | /devopsmount      | any path                                   | If writeLogsToFile key is set to true it will write the files to disk in this path                                          |


### Step 2 Use winston logger anywhere you need

Once config is defined you can use this logger anywhere. There are 2 ways to use this file. 
1. Temporary 
2. Globally 

```javascript
// Temporary Use in very few files

const { winstonInit } = require('./index')
const logger = winstonInit()

const message = 'Hi from logger'

// Use the logger methods to suit your needs
logger.error(message)
logger.warn(message)
logger.info(message)
logger.http(message)
logger.log(message)
logger.debug(message)
logger.silly(message)

```

After setting the config you can directly invoke the init method and assign that to a global variable. It will be helpful if you want to use logger in too many files

```javascript
// Global way
const { winstonInit } = require('./index')
global.logger = winstonInit()

// Use logger function anywhere in your app without importing winston package 
logger.error(message)
```