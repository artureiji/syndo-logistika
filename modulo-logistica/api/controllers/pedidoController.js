'use strict';

const sqlite3 = require('sqlite3');

const com_banco = function(callback) {
      let db = new sqlite3.Database('./banco.db');
      console.log('Conectado ao banco');
      let ret = callback(db);
      db.close();
      console.log('Banco fechado');
}
exports.rastrear_pedido = function(req, res) {
      
      com_banco(banco => {
           
          res.send("Hello!");
      });
      
  };

exports.rastrear_entrega = function(req, res) {
    com_banco(banco => {
        banco.get("SELECT * FROM Rastreio where codigo = ? ORDER BY codigo;", [req.params.codRastreio], (err, row) => res.send(row));
    });
};
