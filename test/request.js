var chai = require('chai')
var expect = chai.expect
var myRequest = require('../lib/request.js')
var request = require('request')
var sinon = require('sinon')

describe('Request', function () {
  afterEach(function () {
    request.post.restore()
  })

  it('should return 202 Accepted', function (done) {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 1,
      short_message: 'My error',
      full_message: undefined
    }

    sinon
      .stub(request, 'post')
      .yields(null, {statusCode: 202}, null)

    myRequest(expectedGELFMessage, function (error, sent) {
      if (error) {
        return done(error)
      }
      sinon.assert.calledOnce(request.post)
      expect(error).to.be.null
      expect(sent).to.be.true
      done()
    })
  })

  it('should return false', function (done) {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 1,
      short_message: 'My error',
      full_message: undefined
    }

    sinon
      .stub(request, 'post')
      .yields(null, {statusCode: 404}, null)

    myRequest(expectedGELFMessage, function (error, sent) {
      sinon.assert.calledOnce(request.post)
      expect(error).to.be.null
      expect(sent).to.be.false
      done()
    })
  })

  it('should return error', function (done) {
    var expectedGELFMessage = {
      namespace: 'myApp',
      level: 1,
      short_message: 'My error',
      full_message: undefined
    }

    sinon
      .stub(request, 'post')
      .yields(new Error('my Error'), {statusCode: 404}, null)

    myRequest(expectedGELFMessage, function (error, sent) {
      sinon.assert.calledOnce(request.post)
      expect(error).to.be.an.instanceof(Error)
      expect(error).to.exist
      expect(sent).to.be.null
      done()
    })
  })
})
