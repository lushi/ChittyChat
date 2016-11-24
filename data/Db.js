const _ = require ('lodash');

const Db = (() => {
  return {
    set: (collection, data) => {
      if (typeof collection === 'undefined' || collection === null) {
        throw new Error('collection is not defined');
      }

      if (typeof data === 'undefined' || data === null) {
        throw new Error('data is not defined');
      }
    }
  }
})();

module.exports = Db;
