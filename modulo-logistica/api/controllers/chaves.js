'use strict';

const dbPromise = require('../services/database');
const uuidv5 = require('uuid/v5');

exports.criar = function(req, res) {
    const our_uuid = '1a597a3d-8b4a-4b54-99c3-f1a2eabdb2ff';
    if(req.body.api_key !== our_uuid) {
        res.send({ status: "unauthorized" });
    } else {
        dbPromise.promise.then(banco => {

            const new_uuid = uuidv5(req.body.ownerName, our_uuid);
            banco.run("INSERT INTO Chaves values(?,?);", [new_uuid,req.body.ownerName])
            .then(rows => res.send(
                {
                    status: "ok",
                    novo_uuid: new_uuid
                })
            );
        });
    }

};

exports.checa_key = function(req, res, callback) {
    dbPromise.promise.then(banco => {
        banco.get("SELECT * FROM Chaves WHERE api_key = ?;",req.body.apiKey)
        .then(key => {
            if(!key) {
                res.send({ status: "unauthorized" });
            } else {
                callback();
            }
        });
    });
}
