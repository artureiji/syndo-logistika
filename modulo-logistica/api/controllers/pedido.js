'use strict';

database = require('../services/database');

exports.rastrear = function(req, res) {
    database.dbConnection(banco => {    
        res.send("Hello!");
    });  
};

exports.rastrear_entrega = function(req, res) {
    database.dbConnection(banco => {
        banco.get("SELECT * FROM Rastreio where codigo = ? ORDER BY codigo;", [req.params.codigoRastreio], (err, row) => res.send(row));
    });
};
