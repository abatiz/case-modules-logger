'use strict';
/**
 * This file will start a loop that sends messages to graylog using the
 * > GELF
 * method.
 * The test will last ONE MINUTE. After that minute the process will exit abruptly.
 * Messages that were not send during that time window will be probably lost, which is exactly what we want.
 * The intention is to test how many messages per minute can be sent using this method to test the CPU + Network efficency of the method
 * After the test ends, you should go to graylog inputs and see how many messages per minute reached the server.
 * There should be an specific test input for this purpose at:
 * http://graylog.caseonit.net:9000/system/inputs
 *
 * This test should be executed in isolation.
 * `DEBUG=* node UsingGelf.js`
 */
const Logger = require( '../' )( { namespace: 'PerformanceTest - GELF',  useGelfLib: true } );

const ExecuteTest = require( './executeTest' );

ExecuteTest( Logger, 'GELF' );