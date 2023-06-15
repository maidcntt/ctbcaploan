const { ConsoleLog } = require('../models')

const logger = async (message, sessionData, data) => {
    console.log(message);
    if (data) {
        console.log(data);
    }
    try {
        // let dataStr;
        // if (data instanceof Array) {
        //     dataStr = data.toString();
        // } else if (typeof data === 'object') {
        //     dataStr = JSON.stringify(data);
        // }
        await ConsoleLog.create({ log: message, sessionId: sessionData?.sessionId, username: sessionData?.username, type: 'info', data: data });
        
    } catch (err) {
        console.log(`Logger: Unable to log below message to db: ${message}, error: ${err.message}`);
    }
    
};


const errorLogger = async (message, sessionData, data, printData = true) => {
    console.error(message);
    if (data && printData) {
        console.log(data);
    }
    try {
        await ConsoleLog.create({ log: message, sessionId: sessionData?.sessionId, username: sessionData?.username, type: 'error', data: data });
    } catch (err) {
        console.log(`ErrorLogger: Unable to log below message to db: ${message}, error: ${err.message}`);
    }
};


const warningLogger = async (message, sessionData, data) => {
    console.error(message);
    if (data) {
        console.log(data);
    }
    try {
        await ConsoleLog.create({ log: message, sessionId: sessionData?.sessionId, username: sessionData?.username, type: 'warning', data: data });
    } catch (err) {
        console.log(`WarningLogger: Unable to log below message to db: ${message}, error: ${err.message}`);
    }
};

module.exports = {
    logger, errorLogger, warningLogger
};