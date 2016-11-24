const chai = require('chai');
// make a copy of production database for testing purposes
const testDb = Object.assign({}, require('../data/Db.js'));

const expect = chai.expect;

describe('Db', function() {
  describe('#set', function() {
    it('should throw error if collection name is not provided', () => {
      let fn = () => {testDb.set(null, {foo: 'foo'})};
      expect(fn).to.throw(Error);
    })

    it('should throw error if data is not provided', () => {
      let fn = () => {testDb.set('User', null)};
      expect(fn).to.throw(Error);
    })
  })
})
