const chai = require('chai');
const Db = require('../data/Db.js');

const expect = chai.expect;

describe('Db', function() {
  describe('#set', function() {
    it('should throw error if collection name is not provided', () => {
      let fn = () => {Db.set(null, {foo: 'foo'})};
      expect(fn).to.throw(Error);
    })

    it('should throw error if data is not provided', () => {
      let fn = () => {Db.set('User', null)};
      expect(fn).to.throw(Error);
    })
  })
})
