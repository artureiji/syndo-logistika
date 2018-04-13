'use strict';

const database = require('../services/database');

exports.rastrear = function(req, res) {
    database.dbConnection(banco => {
        banco.all("SELECT * FROM Rastreio where codigo = ? ORDER BY data desc;", [req.params.codigoRastreio],
            (err, rows) => res.send(
                {
                    status: "ok",
                    historicoRastreio: rows.map(row =>
                        ({
                            hora: new Date(row.data).toISOString(),
                            local: row.endereco,
                            mensagem: row.mensagem
                        })
                    )
                }
            )
        );
    });
};
