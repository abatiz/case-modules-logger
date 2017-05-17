'use strict';

const GRAYLOG_HOSTNAME = process.env.NODE_ENV === 'test' ? 'localhost' : 'graylog.caseonit.net';
const PORT = process.env.GRAYLOG_PORT || '12201';
const GRAYLOG_URL = `http://${GRAYLOG_HOSTNAME}/${PORT}/gelf`;

module.exports = {
    GRAYLOG_HOSTNAME,
    GRAYLOG_URL
};
