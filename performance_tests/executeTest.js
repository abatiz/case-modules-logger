'use strict';

const CONSTANTS = require('../lib/constants');

module.exports = (Logger, method, duration = 60) => {

    console.info('Active constants during the test', CONSTANTS);

    const startTime = Date.now();

    const tryToSend = (i = 0) => {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        if (elapsed > duration) {
            console.info('The test has ended.');
            console.info(`| Test date | Test duration | Send attempts using ${method}| Received on Graylog |`);
            console.info('|-|-|-|-|')
            console.info(`| ${new Date()} | ${duration}  | ${i}        | manually check it on Graylog |`);
            console.info('\n Please go check http://graylog.caseonit.net:9000/system/inputs');
            return;
        }
        Logger.info(`${method} test message`, 'This is the message number ' + i, 'Time elapsed ' + elapsed);
        setTimeout(tryToSend, 0, i + 1)
    }

    tryToSend()

}