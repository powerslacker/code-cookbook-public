const authorize = require('../utils/authorize')
const chai = require('chai')
const expect = chai.expect

describe('It should authorize a user', function () {
  it('returns false without a user_id and an author_id', function () {
    expect(authorize()).to.eql(false)
  })

  it('returns false with a mismatched user_id and an author_id', function () {
    expect(authorize('123', 'abc')).to.eql(false)
  })

  it('returns true with matching user_id and an author_id', function () {
    expect(authorize('123', '123')).to.eql(true)
  })
})
