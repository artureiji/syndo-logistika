'use strict';

const database = require('../services/database');
const uuidv5 = require('uuid/v5');

exports.rastrear = function(req, res) {
    const our_uuid = "1a597a3d-8b4a-4b54-99c3-f1a2eabdb2ff";
    const new_uuid = uuidv5(req.params.owner_name, our_uuid);
    database.dbConnection(banco => {
        banco.run("INSERT INTO Chaves values(?,?);", [new_uuid,req.params.owner_name],
            (err, rows) => res.send(
                {
                    status: "ok",
                    novo_uuid: new_uuid
                }
            )
        );
    });
};
