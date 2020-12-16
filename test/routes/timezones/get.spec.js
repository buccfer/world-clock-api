'use strict'

const { URL } = require('url')
const { expect, httpStatus, nock, request, chance, moment, mockDate, app, config } = require('../../index')

describe('GET /timezones/:name', () => {
  const { origin: timezonesBaseUrl, pathname: timezonesPath } = new URL(config.TIMEZONES_API_URL)

  before(() => {
    if (!nock.isActive()) {
      nock.activate()
    }

    mockDate.set(new Date())
  })

  beforeEach(() => {
    nock.cleanAll()
  })

  after(() => {
    nock.restore()
    mockDate.reset()
  })

  it(`Should respond ${httpStatus.SERVICE_UNAVAILABLE} if timezones API is down`, (done) => {
    const expectedStatusCode = httpStatus.SERVICE_UNAVAILABLE
    const targetTimezone = chance.pickone(moment.tz.names())

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.SERVICE_UNAVAILABLE, { error: chance.sentence() })

    request(app)
      .get(`/timezones/${targetTimezone}`)
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
    const targetTimezone = chance.word()

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.OK, moment.tz.names())

    request(app)
      .get(`/timezones/${targetTimezone}`)
      .end((err, { status, body }) => {
        expect(err).to.be.null
        expect(status).to.equal(expectedStatusCode)
        expect(body).to.deep.equal({
          statusCode: expectedStatusCode,
          errorMessage: `Timezone "${targetTimezone}" does not exist.`
        })
        expect(scope.isDone()).to.be.true
        done()
      })
  })

  it(`Should respond ${httpStatus.OK} with the timezone data`, async () => {
    const targetTimezone = chance.pickone(moment.tz.names())

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.OK, moment.tz.names())

    const { status, body } = await request(app).get(`/timezones/${targetTimezone}`)
    expect(status).to.equal(httpStatus.OK)
    expect(body).to.deep.equal({
      name: targetTimezone,
      localTime: moment().tz(targetTimezone).format('DD/MM/yyyy h:mma')
    })
    expect(scope.isDone()).to.be.true
  })
})
