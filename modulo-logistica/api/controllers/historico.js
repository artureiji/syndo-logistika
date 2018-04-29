'use strict';

const dbPromise = require('../services/database');
const chaves = require('../controllers/chaves');

exports.inserir_req = function(req,res) {
    const {
        codigoRastreio,
        endereco,
        data,
        mensagem
    } = req.body;
    chaves.checa_key(req, res).then((key) => {
        inserir(codigoRastreio, endereco, data, mensagem, key);
    });
};

exports.inserir = function(codigoRastreio, endereco, data, mensagem, apiKey) {
    dbPromise.promise.then(banco => {
        banco.run("INSERT INTO Historico values(null,?,?,?,?,?);", [codigoRastreio,endereco,data,mensagem,key])
        .then(() => res.send(
            {
                status: "ok"
            }
        )
        );
    });
};
