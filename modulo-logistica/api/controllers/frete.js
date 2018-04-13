'use strict';

database = require('../services/database');

exports.calcular = function(req, res) {
    database.dbConnection(banco => {    
        res.send("Hello!");
    });  
};