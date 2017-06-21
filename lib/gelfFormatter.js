var hostname = require('os').hostname()

/**
 * @summary Devuelve un objeto GELF estándar a partir de los parámetros.
 * @access private
 * @example {
 *  "version": "1.1",
 *  "host": "example.org",
 *  "short_message": "A short message that helps you identify what is going on",
 *  "full_message": "Backtrace here\n\nmore stuff",
 *  "timestamp": 1385053862.3072,
 *  "level": 1,
 *  "_user_id": 9001,
 *  "_some_info": "foo",
 *  "_some_env_var": "bar"
 *}
 * @see {@link http://docs.graylog.org/en/2.0/pages/gelf.html#gelf-format-specification|GELF Format Specification}
 * @param {string} type La criticidad (level) del mensaje
 * @param {string} namespace El nombre que identifica al script que lanza este Logger
 * @param {string} shortMessage A short descriptive message; MUST be set by client library.
 * @param {string} fullMessage A long message that can i.e. contain a backtrace; optional.
 * @return {object} Objeto con formato GELF estándar
 */
var gelfFormatter = function gelfFormatter (type, namespace, shortMessage, full_message = 'No full message') {
  var levels = { error: 1, warn: 4, log: 5, info: 6, debug: 7 }

  /* eslint camelcase: 0 */
  var GELFmessage = {
    namespace: namespace.split(':').join('-'),
    hostname: hostname,
    level: levels[type] || 1,
    short_message: shortMessage,
    full_message, // Si es undefined, graylog no lo registra
    timestamp: Date.now() / 1000
  }

  return GELFmessage
}

module.exports = gelfFormatter
