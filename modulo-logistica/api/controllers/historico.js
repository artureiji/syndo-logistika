'use strict';

const dbPromise = require('../services/database');
const chaves = require('../controllers/chaves');

exports.inserir = function(req, res) {
    const {
        codigoRastreio,
        endereco,
        data,
        mensagem
    } = req.body;

    chaves.checa_key(req, res).then((key) => {
        dbPromise.promise.then(banco => {
            banco.run("INSERT INTO Historico values(null,?,?,?,?,?);", [codigoRastreio,endereco,data,mensagem,key])
            .then(() => res.send(
                {
                    status: "ok"
                }
            )
            );
        });
    });
};
