var hostname = require('os').hostname()

var gelfFormatter = function gelfFormatter (type, namespace, shortMessage, fullMessage) {
  var levels = { error: 1, warn: 4, log: 5, info: 6, debug: 7 }

  var GELFmessage = {
    namespace: namespace.split(':').join('-'),
    hostname: hostname,
    level: levels[type] || 1,
    short_message: shortMessage,
    full_message: fullMessage, // Si es undefined, graylog no lo registra
    timestamp: Math.round(new Date() / 1000)
  }

  return GELFmessage
}

module.exports = gelfFormatter
