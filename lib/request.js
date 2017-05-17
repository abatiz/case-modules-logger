var Request = require('request')
const CONSTANTS = require( './constants' );
/**
 * Enviar el mensaje de log a Graylog.
 * @access private
 * @param {object} body - El mensaje GELF a enviar
 * @param {requestCallback} callback - The callback that handles the response.
 */
function request( body, callback = (err,success) => {console.log(err,success)  } ) {
  Request.post(CONSTANTS.GRAYLOG_URL, {
    json: true,
    body: body
  }, function (error, response, body) {
    if (error) {
      return callback(error, null)
    }

    if (!error && response.statusCode === 202) {
      return callback(null, true)
    }

    return callback(null, false)
  })
}

/**
 * @summary This callback is displayed as part of the Request class.
 * @access private
 * @callback requestCallback
 * @param {Error} error El error de la petición.
 * @param {Boolean} success Si el status devuelvo es exitoso (202) o no (cualquier otro)
 */

module.exports = request
