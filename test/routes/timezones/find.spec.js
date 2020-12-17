'use strict'

const { URL } = require('url')
const { expect, httpStatus, nock, request, chance, moment, mockDate, app, config } = require('../../index')
const redis = require('../../../src/lib/redis')

const path = '/timezones'

describe(`GET ${path}`, () => {
  const now = new Date()
  const { origin: timezonesBaseUrl, pathname: timezonesPath } = new URL(config.TIMEZONES_API_URL)

  before(() => {
    if (!nock.isActive()) {
      nock.activate()
    }

    mockDate.set(now)
  })

  beforeEach(async () => {
    await redis.flushallAsync()
    nock.cleanAll()
  })

  after(() => {
    nock.restore()
    mockDate.reset()
  })

  it(`Should respond ${httpStatus.SERVICE_UNAVAILABLE} if the timezone API is down`, (done) => {
    const expectedStatusCode = httpStatus.SERVICE_UNAVAILABLE

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.SERVICE_UNAVAILABLE, { error: chance.sentence() })

    request(app)
      .get(path)
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

  it(`Should respond ${httpStatus.OK} with the list of timezones`, async () => {
    const expectedTimezones = chance.pickset(moment.tz.names(), 3)

    const scope = nock(timezonesBaseUrl)
      .get(timezonesPath)
      .reply(httpStatus.OK, expectedTimezones)

    const { status, body } = await request(app).get(path)
    expect(status).to.equal(httpStatus.OK)
    expect(body).to.be.an('object').that.has.all.keys('timezones', 'total')
    expect(body.total).to.equal(expectedTimezones.length)
    expect(body.timezones).to.deep.equal(
      expectedTimezones.map((tz) => ({
        name: tz,
        localTime: moment().tz(tz).format('DD/MM/yyyy h:mma')
      }))
    )

    expect(scope.isDone()).to.be.true
  })
})
