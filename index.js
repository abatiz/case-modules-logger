var debug = require('debug')
var request = require('./lib/request.js')
var gelfFormatter = require('./lib/gelfFormatter.js')

var Logger = function Logger (options) {
  // Build module Options object
  var moduleOptions = {}

  if (typeof options !== 'string') {
    Object.assign(moduleOptions, options)
  } else {
    moduleOptions.namespace = options
  }

  if (!moduleOptions.namespace) {
    throw new Error('Namespace no definido en las opciones')
  }

  // Instantiate each constructor and cache them for performance boost
  var ERROR = debug(moduleOptions.namespace + ':error')
  var WARN = debug(moduleOptions.namespace + ':warn')
  var LOG = debug(moduleOptions.namespace + ':log')
  var INFO = debug(moduleOptions.namespace + ':info')
  var DEBUG = debug(moduleOptions.namespace + ':debug')

  // Public methods
  var API = {
    error: function logError (shortMessage, fullMessage) {
      var formattedMessage = gelfFormatter('error', moduleOptions.namespace, shortMessage, fullMessage)

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return ERROR(formattedMessage.short_message)
    },

    warn: function logWarn (shortMessage, fullMessage) {
      var formattedMessage = gelfFormatter('warn', moduleOptions.namespace, shortMessage, fullMessage)

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return WARN(formattedMessage.short_message)
    },

    log: function logLog (shortMessage, fullMessage) {
      var formattedMessage = gelfFormatter('log', moduleOptions.namespace, shortMessage, fullMessage)

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return LOG(formattedMessage.short_message)
    },

    info: function logInfo (shortMessage, fullMessage) {
      var formattedMessage = gelfFormatter('info', moduleOptions.namespace, shortMessage, fullMessage)

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return INFO(formattedMessage.short_message)
    },

    debug: function logInfo (shortMessage, fullMessage) {
      var formattedMessage = gelfFormatter('debug', moduleOptions.namespace, shortMessage, fullMessage)

      return DEBUG(formattedMessage.short_message)
    }
  }

  return API
}

module.exports = Logger
