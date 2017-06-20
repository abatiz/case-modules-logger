'use strict';

const Logger = require( '../' )( 'TracingExample', {useGelfLib: true} );

const trace = Logger.trace('Trace title');
trace.info( 'This is the first message' );
trace.log( 'Second message', 'This message also includes some detail' )
trace.info( 'Third message', { text: 'Complex details can also be includes, like objects' }, [ 'Or arrays' ], [ { cool: ' or maybe also' }, { cool: ' arrays of' }, { cool: 'Objects' }] );
trace.info( 'Fourth message', 'Using the info method will NOT make the trace go back to that severity level. This is one way road' );
trace.warn( 'Fifth message', 'We reached the warning level, the entire trace will be flagged as warning' );

trace.flush(); // Print everything to the console!!!