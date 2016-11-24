const chai = require('chai');
const Db = require('../data/Db.js');

const expect = chai.expect;

describe('Db', function() {
  describe('#set', function() {
    it('should throw error if collection name is not provided', function() {
      let fn = () => {Db.set(null, {foo: 'foo'})};
      expect(fn).to.throw(Error);
    })
  })
})
