'use strict';

const Gelf = require( 'gelf' );
const Request = require( './request' );
const CONSTANTS = require( './constants' );
/**
 * Senders factory.
 * It returns a function that sends provided message (GELF formatted) to Graylog.
 * If the useGelf variable is true, it will return a gelf sender ( gzip + udp )
 * If the useGelf is false, it will return an http sender
 */
module.exports = (useGelf) => {

    if ( useGelf ) {
        const GelfSender = new Gelf( {
            graylogPort: CONSTANTS.GRAYLOG_PORT,
            graylogHostname: CONSTANTS.GRAYLOG_HOSTNAME,
            connection: 'wan', maxChunkSizeWan: 1420, maxChunkSizeLan: 8154
        } );
        return (message) => GelfSender.emit('gelf.log',message)
    }

    return Request;
}