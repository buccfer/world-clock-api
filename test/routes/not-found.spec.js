'use strict'

const { expect, httpStatus, request, chance, app } = require('../index')

describe('Default handler', () => {
  it(`Should respond ${httpStatus.NOT_FOUND} if route does not exist`, (done) => {
    const expectedStatusCode = httpStatus.NOT_FOUND

    request(app)
      .get(`/${chance.word()}`)
      .end((err, { status, body }) => {
        expect(err).to.be.null
        expect(status).to.equal(expectedStatusCode)
        expect(body).to.deep.equal({
          statusCode: expectedStatusCode,
          errorMessage: 'Resource not found'
        })
        done()
      })
  })
})
