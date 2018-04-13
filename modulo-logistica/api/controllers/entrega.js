'use strict';

database = require('../services/database');

exports.entrega = function(req, res) {
    database.dbConnection(banco => {
        banco.get("SELECT * FROM Rastreio where codigo = ? ORDER BY codigo;", [req.params.codigoRastreio], (err, row) => res.send(row));
    });
};
