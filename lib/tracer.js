'use strict';

const levels = ['error','warn','log','info','debug'];

/**
 * Returns an object with the same interface the Logger has.
 * The difference is that instead of inmediatelly send the log messages to the
 * target output, messages are collected into a trace and then otputed all at the
 * same time when a trace flush is triggered.
 * You should peform a flush when you finish the trace, but in case you don't do
 * an automatic flush is peformed after a configurable timeout.
 * Please note that you should allways call the flush method.
 * Not doing it and relying to the automatic flush could cause unexpected behaviors and performance problems.
 *
 * @param {any} logger  the logger that will receive the trace (happens on flush)
 * @param {number} secs the number of seconds before triggering  an automatic flush
 * @param {String} traceName An string that will be used as the trace title
 * @return {Object} tracer - the tracer object containing the usual methods the logger has
 * @return {function} tracer.flush - sends the complete trace to the provided logger
*/
const tracer = function ( logger , traceName = 'Steps', secs = 30 ) {
    secs = typeof secs === 'number' ? secs : 30; // Extra sanity check
    let levelName = 'debug';
    let level = 4;
    const steps = [traceName + ': \n'];
    const API = Object.create(null);
    var flushTimeout = resetFlushTimeout();

    /**
     * Flushes the current trace to the logger.
     * If this is an automatic flush, it adds a warning to the trace because this should never happen
    */
    function flush( isAutomaticFlush ) {

        if (isAutomaticFlush){
            API.warn('Automatic trace flush','This usually means an error on the process using the trace or a bad trace-API usage');
        }
        logger[levelName].apply( logger, steps );
        clearTimeout( flushTimeout );
    };

    function resetFlushTimeout() {

        flushTimeout && clearTimeout(flushTimeout);
        flushTimeout = setTimeout(flush, secs * 1000 , true);
        return flushTimeout;
    }

    /**
     * Registers a log message in the trace.
     * Each message is registered as an {@link step} object.
     * If the logging level has more priority than the current one (lower level)
     * then the whole trace level is set to that logging level
     */
    const handleLogMessage = (lvlName, lvl, title, ...rest) => {
        const step = { title };
        if ( rest.length > 0 ){
            step.details = rest.length === 1 ? rest[0] : rest;
        }
        steps.push(step);
        if (lvl < level){
            level = lvl;
            levelName = lvlName;
        }
        resetFlushTimeout();
    };

    /**
     * We bind flush to false so any extra parameter is passed is ignored and
     * we do not erroneous flag manual flush as automatic*/
    API.flush = flush.bind(API,false);
    /**
     * Build the rest of the API interface
    */
    return levels.reduce(
        (api, name, lvl) => {
            api[name] = handleLogMessage.bind(api,name,lvl);
            return api;
        }, API);
};


/**
 * @typedef {Object} tracer.step
 */

module.exports = tracer;