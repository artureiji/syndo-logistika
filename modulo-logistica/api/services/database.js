const sqlite3 = require('sqlite3');

const com_banco = function(callback) {
      let db = new sqlite3.Database('./banco.db');
      console.log('Conectado ao banco');
      let ret = callback(db);
      db.close();
      console.log('Banco fechado');
};

exports.dbConnection = com_banco;
