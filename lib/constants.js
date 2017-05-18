'use strict';

const GRAYLOG_HOSTNAME = process.env.GRAYLOG_HOSTNAME || (process.env.NODE_ENV === 'test' ? 'localhost' : 'graylog.caseonit.net');
const GRAYLOG_PORT = process.env.GRAYLOG_PORT || '12201';
const GRAYLOG_URL = `http://${GRAYLOG_HOSTNAME}:${GRAYLOG_PORT}/gelf`;

module.exports = {
    GRAYLOG_HOSTNAME,
    GRAYLOG_URL,
    GRAYLOG_PORT
};
