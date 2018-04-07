'use strict';

const sqlite3 = require('sqlite3');


exports.rastrear_pedido = function(req, res) {
      let db = new sqlite3.Database('banco.db');
      console.log('abri o banco');
      db.close();
      console.log('fechei o banco');
      res.send("Hello!");
  };
