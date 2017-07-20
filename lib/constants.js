'use strict'

const GRAYLOG_HOSTNAME = process.env.GRAYLOG_HOSTNAME || (process.env.NODE_ENV === 'test' ? 'localhost' : 'graylog.caseonit.net')
const GRAYLOG_PORT_HTTP = process.env.GRAYLOG_PORT_HTTP || '12201'
const GRAYLOG_PORT_UDP = process.env.GRAYLOG_PORT || '12202'
const GRAYLOG_URL_HTTP = `http://${GRAYLOG_HOSTNAME}:${GRAYLOG_PORT_HTTP}/gelf`

module.exports = {
  GRAYLOG_HOSTNAME,
  GRAYLOG_URL_HTTP,
  GRAYLOG_PORT_UDP
}
