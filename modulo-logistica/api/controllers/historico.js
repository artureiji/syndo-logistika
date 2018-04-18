'use strict';

const database = require('../services/database');

exports.inserir = function(req, res) {
    const {
        codigoRastreio,
        endereco,
        data,
        mensagem,
        apiKey
    } = req.params;
    database.dbConnection(banco => {
        banco.run("INSERT INTO Historico values(null,?,?,?,?,?);", [codigoRastreio,endereco,data,mensagem,apiKey],
            (err, rows) => res.send(
                {
                    status: "ok",
                    novo_uuid: new_uuid
                }
            )
        );
    });
};
