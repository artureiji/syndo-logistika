'use strict';

const database = require('../services/database');

exports.cadastrar = function(req, res) {
  database.dbConnection(banco => {
      banco.run("INSERT INTO Pedido (id_pedido, codigo_rastreio) values(?,?);", [parseInt(req.body.id_pedido, 10), req.body.cod_rastreio],
          (err, rows) =>
              res.send({status: "ok"})
          
      );
  });

};
