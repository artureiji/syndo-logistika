'use strict';

const uuidv4 = require('uuid/v4');
const database = require('../services/database');

exports.cadastrar = function(req, res) {
  codigo_rastreio = uuidv4();
  database.dbConnection(banco => {

      banco.run("INSERT INTO Pedido (id_pedido, codigo_rastreio) values(?,?);", req.body.id_pedido, codigo_rastreio,
          (err, rows) =>
              res.send({status: "ok"})
          
      );
  });

};