/**
 * Reporta logs a Graylog y muestra por consola al estilo Debug.
 * @module case-logger
 */
var debug = require('debug')
var request = require('./lib/request.js')
var gelfFormatter = require('./lib/gelfFormatter.js')

/**
 * @summary Interfaz con los métodos que se pueden usar para loguear.
 * @access public
 * @description Según el nivel de log que se quiera usar, hay distintos métodos disponibles. Todos ellos menos el nivel <i>debug</i> envían a Graylog.
 * @param {String|Object} options Opciones de inicialización del módulo. (Si sólo se pasa un string, será el <code>namespace</code>)
 * @param {String} options.namespace El identificador del script que llama al Logger.
 * @param {Boolean} options.logger (Opcional) Si enviar el mensaje a Graylog o no.
 * @return {API} La salida en consola, al estilo Debug.
 */
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
    error: function logError (shortMessage, ...fullMessage) {
      var formattedMessage = gelfFormatter('error', moduleOptions.namespace, shortMessage, fullMessage.join(' '))

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return ERROR(formattedMessage.short_message)
    },

    warn: function logWarn (shortMessage, ...fullMessage) {
      var formattedMessage = gelfFormatter('warn', moduleOptions.namespace, shortMessage, fullMessage.join(' '))

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return WARN(formattedMessage.short_message)
    },

    log: function logLog (shortMessage, ...fullMessage) {
      var formattedMessage = gelfFormatter('log', moduleOptions.namespace, shortMessage, fullMessage.join(' '))

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return LOG(formattedMessage.short_message)
    },

    info: function logInfo (shortMessage, ...fullMessage) {
      var formattedMessage = gelfFormatter('info', moduleOptions.namespace, shortMessage, fullMessage.join(' '))

      /* istanbul ignore else */
      if (moduleOptions.logger !== false) {
        request(formattedMessage, function () {})
      }

      return INFO(formattedMessage.short_message)
    },

    debug: function logInfo (shortMessage, ...fullMessage) {
      var formattedMessage = gelfFormatter('debug', moduleOptions.namespace, shortMessage, fullMessage.join(' '))

      return DEBUG(formattedMessage.short_message)
    }
  }

  return API
}

module.exports = Logger

/**
 * @typedef {Object} API
 * @access public
 * @summary Los métodos de Logger que se pueden usar.
 * @property {APIFunc} error Loguear y enviar mensajes de nivel <b>error</b>.
 * @property {APIFunc} warn Loguear y enviar mensajes de nivel <b>warning</b>.
 * @property {APIFunc} log Loguear y enviar mensajes de nivel <b>log</b>.
 * @property {APIFunc} info Loguear y enviar mensajes de nivel <b>info</b>.
 * @property {APIFunc} debug Loguear mensajes de nivel <b>debug</b>. <u>No se envían nunca a Graylog</u>.
 */

/**
 * @typedef {Function} APIFunc
 * @access public
 * @summary Cada método que se puede usar en el Logger.
 * @description Aceptan strings que servirán para imprimirse en consola y enviarse a Graylog.
 * @property {string} shortMessage A short descriptive message; MUST be set by client library.
 * @property {string} fullMessage A long message that can i.e. contain a backtrace; optional.
 * @return {undefined} El mensaje en consola, al estilo DEBUG.
 */
