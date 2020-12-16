'use strict'

const { expect, httpStatus, request, chance, moment, app } = require('../../index')

describe('DELETE /timezones/:name', () => {
  it(`Should always respond ${httpStatus.NO_CONTENT}`, async () => {
    const timezoneToRemove = chance.pickone(moment.tz.names())

    const { status, body } = await request(app)
      .del(`/timezones/${timezoneToRemove}`)

    expect(status).to.equal(httpStatus.NO_CONTENT)
    expect(body).to.deep.equal({})
  })
})
