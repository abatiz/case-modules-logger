var Request = require('request')

var GRAYLOG_URL = 'http://graylog.caseonit.net:12201/gelf'

function request (body, callback) {
  Request.post(GRAYLOG_URL, {
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

module.exports = request
