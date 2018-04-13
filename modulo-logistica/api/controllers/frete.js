'use strict';

const database = require('../services/database');

exports.calcular = function(req, res) {
    let valor = 5.75;
    let {tipo, ceporigem, cepdestino, quantidade, peso, formato, comprimento, altura, largura, diametro} = req.query;
    //valor = ;
    res.send(valor.toString());
};
