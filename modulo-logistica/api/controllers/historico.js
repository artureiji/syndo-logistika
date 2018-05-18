'use strict';

const db = require('../services/database');
const chaves = require('../controllers/chaves');

exports.inserir_req = function(req,res) {
    const {
        codigoRastreio,
        endereco,
        data,
        mensagem
    } = req.body;
    chaves.checa_key(req, res).then((key) => {
        exports.inserir(codigoRastreio, endereco, data, mensagem, key).then(() => res.send(
            {
                status: "ok"
            }
        ));
    });
};

exports.inserir = function(codigoRastreio, endereco, data, mensagem, apiKey) {
    return db.client.query("INSERT INTO Historico values(DEFAULT,$1,$2,$3,$4,$5)", [codigoRastreio,endereco,new Date(data),mensagem,apiKey]);
};
