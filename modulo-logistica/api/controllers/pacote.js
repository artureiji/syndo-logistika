'use strict';

const database = require('../services/database');

exports.cadastrar = function(req, res) {
    database.dbConnection(banco => {
        res.send("Hello!");
    });
};
