var chai = require('chai')
var gelfFormatter = require('../lib/gelfFormatter.js')
var expect = chai.expect

describe('GELF formatter', function () {
  it('should return a valid GELF Error message when NO type is passed', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 1,
      short_message: 'My log',
      full_message: undefined,
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter(null, 'myApp', 'My log')).to.deep.equal(expectedGELFMessage)
  })

  it('should return a valid GELF Error message', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 1,
      short_message: 'My log',
      full_message: undefined,
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter('error', 'myApp', 'My log')).to.deep.equal(expectedGELFMessage)
  })

  it('should return a valid GELF Warn message', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 4,
      short_message: 'My log',
      full_message: undefined,
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter('warn', 'myApp', 'My log')).to.deep.equal(expectedGELFMessage)
  })

  it('should return a valid GELF Log message', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 5,
      short_message: 'My log',
      full_message: undefined,
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter('log', 'myApp', 'My log')).to.deep.equal(expectedGELFMessage)
  })

  it('should return a valid GELF Info message', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 6,
      short_message: 'My log',
      full_message: undefined,
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter('info', 'myApp', 'My log')).to.deep.equal(expectedGELFMessage)
  })

  it('should return a valid GELF Debug message', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 7,
      short_message: 'My log',
      full_message: undefined,
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter('debug', 'myApp', 'My log')).to.deep.equal(expectedGELFMessage)
  })

  it('should populate full_message field', function () {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 7,
      short_message: 'My log',
      full_message: 'My full message is populated',
      hostname: require('os').hostname(),
      timestamp: Math.round(new Date() / 1000)
    }

    expect(gelfFormatter('debug', 'myApp', 'My log', 'My full message is populated')).to.deep.equal(expectedGELFMessage)
  })
})
