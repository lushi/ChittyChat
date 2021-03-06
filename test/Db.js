const chai = require('chai');
const expect = chai.expect;

// make a copy of production database for testing purposes
const testDb = Object.assign({}, require('../data/Db.js'));

describe('Db', () => {
  describe('#set', () => {
    it('should throw error if collection name is not provided', () => {
      const fn = () => {testDb.set(null, {foo: 'foo'})};
      expect(fn).to.throw(Error);
    })

    it('should throw error if data is not provided', () => {
      const fn = () => {testDb.set('User', null)};
      expect(fn).to.throw(Error);
    })

    const collection = 'Message';
    const data = {content: 'Hai', from: 'Mary', to: 'Joe'};
    let now;

    beforeEach(() => {
      testDb.clear();
      now = Date.now();
      testDb.set(collection, data);
    });

    afterEach(() => {
      testDb.clear();
    })

    it('should insert document the given collection in the database', () => {
      expect(testDb.getAll(collection).length).to.not.equal(0);
    })

    it('should include the given data in the inserted document', () => {
      expect(testDb.getAll(collection)[0]).to.include.keys('content', 'from', 'to');
    })

    it('should include property "_id" in the inserted document', () => {
      expect(testDb.getAll(collection)[0]).to.include.keys('_id');
    })

    it('should include a unique "_id" value in the inserted document', () => {
      testDb.set(collection, {content: 'Hello', from: 'Joe', to: 'Mary'});

      expect(testDb.getAll(collection)[0]._id).to.not.equal(testDb.getAll(collection)[1]._id);
    })

    it('should include property "creation_time" in the inserted document', () => {
      expect(testDb.getAll(collection)[0]).to.include.keys('creation_time');
    })

    it('creation time should be time of when document was created', () => {
      expect(testDb.getAll(collection)[0].creation_time).to.be.equal(now);
    })

    it('should return a document object with property "modified_time"', () => {
      expect(testDb.getAll(collection)[0]).to.include.keys('modified_time');
    })

    it('"modified_time" value should equal "creation_time" value', () => {
      const doc = testDb.getAll(collection)[0];
      expect(doc.modified_time).to.be.equal(doc.creation_time);
    })

    it('should return a document object', () => {
      const newDoc = testDb.set(collection, data);
      expect(newDoc).to.be.a('object');
    })

    it('should append new document to existing documents in a given collection', () => {
      testDb.set(collection, {content: 'Hello', from: 'Joe', to: 'Mary'});

      expect(testDb.getAll(collection).length).to.be.equal(2);
    })
  })

  describe('#clear', () => {
    it('should clear all data in the database', () => {
      const doc = testDb.set('Message', {content: 'Hai', from: 'Mary', to: 'Joe'});
      testDb.clear();

      expect(testDb.getAll('Message')).to.not.exist;
    })
  });

  describe('#getAll', () => {
    const collection = 'Message';
    const data = {content: 'Hai', from: 'Mary', to: 'Joe'};

    beforeEach(() => {
      testDb.clear();
      now = Date.now();
      testDb.set(collection, data);
    });

    afterEach(() => {
      testDb.clear();
    })

    it('should throw error if collection name is not provided', () => {
      const fn = () => {testDb.getAll()};
      expect(fn).to.throw(Error);
    })

    it('should return array of documents given collection name', () => {
      testDb.set(collection, {content: 'Hello', from: 'Joe', to: 'Mary'});

      const dbCollection = testDb.getAll(collection);
      expect(dbCollection).to.be.an('array');
      expect(dbCollection.length).to.equal(2);
    })
  })

  describe('#get', () => {
    const collection = 'Message';
    const data = {content: 'Hai', from: 'Mary', to: 'Joe'};

    beforeEach(() => {
      testDb.clear();
      now = Date.now();
      testDb.set(collection, data);
    });

    afterEach(() => {
      testDb.clear();
    })

    it('should throw error if collection name is not provided', () => {
      const fn = () => {testDb.get(null, 10)};
      expect(fn).to.throw(Error);
    })
  })
})
