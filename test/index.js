var chai = require('chai')
var expect = chai.expect
var Logger = require('../index.js')

describe('Logger', function () {
  it('should throw error if no namespace provided through options', function () {
    expect(function () {
      // Instantiate the logger without the namespace option
      Logger({
        logger: false
      })
    }).to.throw('Namespace no definido en las opciones')
  })

  it('should return undefined when logging an error', function () {
    var myLogger = Logger('myApp')
    var logError = myLogger.error('My error')

    expect(logError).to.be.an('undefined')
    expect(logError).to.be.undefined
  })

  it('should return undefined when logging a warn', function () {
    var myLogger = Logger('myApp')
    var logWarn = myLogger.warn('My warn')

    expect(logWarn).to.be.an('undefined')
    expect(logWarn).to.be.undefined
  })

  it('should return undefined when logging a log', function () {
    var myLogger = Logger('myApp')
    var logLog = myLogger.log('My log')

    expect(logLog).to.be.an('undefined')
    expect(logLog).to.be.undefined
  })

  it('should return undefined when logging an info', function () {
    var myLogger = Logger('myApp')
    var logInfo = myLogger.info('My info')

    expect(logInfo).to.be.an('undefined')
    expect(logInfo).to.be.undefined
  })

  it('should return undefined when logging a debug', function () {
    var myLogger = Logger('myApp')
    var logDebug = myLogger.debug('My debug')

    expect(logDebug).to.be.an('undefined')
    expect(logDebug).to.be.undefined
  })
})
