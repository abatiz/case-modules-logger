/**
 * Reporta logs a Graylog y muestra por consola al estilo Debug.
 * @module case-logger
 */
var debug = require('debug')
var gelfFormatter = require('./gelfFormatter.js')
const GraylogSender = require('./GraylogSender')

const Tracer = require('./tracer')

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
  var moduleOptions = { // default options
    separator: '\n',
    useGelfLib: true
  }

  if (typeof options !== 'string') {
    Object.assign(moduleOptions, options)
  } else {
    moduleOptions.namespace = options
  }

  console.info('LOGGER OPTIONS:', moduleOptions)

  if (!moduleOptions.namespace) {
    throw new Error('Namespace no definido en las opciones')
  }

  // Instantiate each constructor and cache them for performance boost
  const Debugger = {
    ERROR: debug(moduleOptions.namespace + ':error'),
    WARN: debug(moduleOptions.namespace + ':warn'),
    LOG: debug(moduleOptions.namespace + ':log'),
    INFO: debug(moduleOptions.namespace + ':info'),
    DEBUG: debug(moduleOptions.namespace + ':debug')
  }
/**
 * Collection of functions to help formatting messages
 */
/**
 * @param {any} o the thing you want to determine if it is an object
 */
  const isObject = (o) => Object.prototype.toString.call(o) === '[object Object]'
/**
 * @param {any} message the message you want to convert to a proper string serialization
 */
  const preprocessMessage = (message) => (isObject(message) || Array.isArray(message)) ? JSON.stringify(message) : message
  const preprocessMessages = (messages) => messages.map(preprocessMessage)

  const sender = GraylogSender(moduleOptions.useGelfLib)

/**
 * High order function that creates log senders/reporters.
 * Each logger will be specific for the provided level, and will generate log messages at that logging level.
 * @param {String} level The level of logging that should be used
 * @param {Bool} reportToGraylog if this sender should report to a remote graylog or not
 * @return {Function} A function that logs using the provided level, and sends the messages graylog if required.
 */
  const makeLogger = (level, reportToGraylog = true) => {
    const LEVEL = level.toUpperCase() // uppercasing once is better than many

    /**
     * Specific level Logger function.
     * Logs the messages you pass to it.
     * Objects are automatically serialized, so you don't have to worry about that.
     */
    return (shortMessage, ...fullMessage) => {
      shortMessage = preprocessMessage(shortMessage)
      fullMessage = preprocessMessages(fullMessage)

      const formattedMessage = gelfFormatter(level, moduleOptions.namespace, shortMessage, fullMessage.join(moduleOptions.separator))
      Debugger[ LEVEL ](formattedMessage.short_message, formattedMessage.full_message) // Debug activated, better show everything
      /* istanbul ignore else */
      if (moduleOptions.logger !== false && reportToGraylog) {
        sender(formattedMessage)
      }
    }
  }

  // Public methods
  var API = {
    error: makeLogger('error'),
    warn: makeLogger('warn'),
    log: makeLogger('log'),
    info: makeLogger('info'),
    debug: makeLogger('debug', false)
  }

  API.trace = Tracer.bind(null, API)

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
