'use strict';

database = require('../services/database');

exports.rastrear = function(req, res) {
    database.dbConnection(banco => {    
        res.send("Hello!");
    });  
};
