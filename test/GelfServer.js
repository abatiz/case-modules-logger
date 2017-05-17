'use strict';
/**
 * This is a dummy gelf server. Useful for testing purposes
 */
var gelfserver = require('node-gelf/server')
var server = gelfserver()
server.on('message', function (gelf) {
  // handle parsed gelf json
  console.info('received message', gelf)
})
server.listen(12201)