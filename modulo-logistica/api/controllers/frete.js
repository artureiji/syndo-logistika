'use strict';

const database = require('../services/database');

exports.calcular = function(req, res) {
    let valor = 0;
    console.log(req);
    res.send(valor);
};
