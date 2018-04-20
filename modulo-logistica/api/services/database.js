const sqlite = require('sqlite');

const Promise = require('promise');
const dbPromise = sqlite.open('./banco.db', { Promise });

exports.promise = dbPromise;
