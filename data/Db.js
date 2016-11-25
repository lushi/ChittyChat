const _ = require ('lodash');

const Db = (() => {
  let _data = {};

  let _id = 0;
  const _generateId = () => {
    return _id++;
  }

  return {
    get: (collection, id) => {
      if (typeof collection === 'undefined' || collecton === null) {
        throw new Error('collection is not defined');
      }
    },

    getAll: (collection) => {
      if (typeof collection === 'undefined' || collection === null) {
        throw new Error('collection is not defined');
      }

      return _data[collection];
    },

    set: (collection, data) => {
      if (typeof collection === 'undefined' || collection === null) {
        throw new Error('collection is not defined');
      }

      if (typeof data === 'undefined' || data === null) {
        throw new Error('data is not defined');
      }

      const now = Date.now();
      const doc = Object.assign({}, data, {
        _id: _generateId(),
        creation_time: now,
        modified_time: now
      });

      if (_data[collection])
        _data[collection].push(doc);
      else {
        _data[collection] = [doc];
      }

      return doc;
    },

    clear: () => {
      _data = {};
    }
  }
})();

module.exports = Db;
