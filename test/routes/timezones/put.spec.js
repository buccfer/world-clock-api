'use strict'

const { URL } = require('url')
const { expect, httpStatus, nock, request, chance, moment, app, config } = require('../../index')
const redis = require('../../../src/lib/redis')

describe('PUT /timezones/:name', () => {
  const { origin: timezonesBaseUrl, pathname: timezonesPath } = new URL(config.TIMEZONES_API_URL)

  before(() => {
    if (!nock.isActive()) {
      nock.activate()
    }
  })

  beforeEach(async () => {
    await redis.flushallAsync()
    nock.cleanAll()
  })

  after(() => {
    nock.restore()
  })

  it(`Should respond ${httpStatus.SERVICE_UNAVAILABLE} if timezones API is down`, (done) => {
    const expectedStatusCode = httpStatus.SERVICE_UNAVAILABLE
    const targetTimezone = chance.pickone(moment.tz.names())

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.SERVICE_UNAVAILABLE, { error: chance.sentence() })

    request(app)
      .put(`/timezones/${targetTimezone}`)
      .end((err, { status, body }) => {
        expect(err).to.be.null
        expect(status).to.equal(expectedStatusCode)
        expect(body).to.deep.equal({
          statusCode: expectedStatusCode,
          errorMessage: httpStatus[expectedStatusCode]
        })
        expect(scope.isDone()).to.be.true
        done()
      })
  })

  it(`Should respond ${httpStatus.NOT_FOUND} if timezone does not exist`, (done) => {
    const expectedStatusCode = httpStatus.NOT_FOUND
    const timezoneToAdd = chance.word()

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.OK, moment.tz.names())

    request(app)
      .put(`/timezones/${timezoneToAdd}`)
      .end((err, { status, body }) => {
        expect(err).to.be.null
        expect(status).to.equal(expectedStatusCode)
        expect(body).to.deep.equal({
          statusCode: expectedStatusCode,
          errorMessage: `Timezone "${timezoneToAdd}" does not exist.`
        })
        expect(scope.isDone()).to.be.true
        done()
      })
  })

  it(`Should respond ${httpStatus.NO_CONTENT} if timezone was selected successfully`, async () => {
    const timezoneToAdd = chance.pickone(moment.tz.names())

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.OK, moment.tz.names())

    const { status, body } = await request(app).put(`/timezones/${timezoneToAdd}`)
    expect(status).to.equal(httpStatus.NO_CONTENT)
    expect(body).to.deep.equal({})
    expect(scope.isDone()).to.be.true
  })
})
