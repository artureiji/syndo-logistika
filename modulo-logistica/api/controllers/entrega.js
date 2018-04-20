'use strict';

const dbPromise = require('../services/database');
const uuidv1 = require('uuid/v1');
const frete = require('./frete');
const chaves = require('../controllers/chaves');

exports.cadastrar = function(req, res) {
    chaves.checa_key(req, res, () => {
        dbPromise.promise.then(banco => {
            const novoId = uuidv1();
            const {
                idProduto,
                tipoEntrega,
                cepOrigem,
                cepDestino,
                peso,
                tipoPacote,
                altura,
                largura,
                comprimento,
                apiKey
            } = req.body;
            const valor = frete.calcular(tipoEntrega, cepOrigem, cepdecepDestinostino, quantidade, peso, formato, comprimento, altura, largura, diametro);
            banco.run("INSERT INTO Entrega values(?,?,?,?,?,?,?,?,?,?,?,?);", [novoId,idProduto,tipoEntrega,valor,cepOrigem,cepDestino,peso,tipoPacote,altura,largura,comprimento,apiKey])
            .then(rows => res.send(
                {
                    status: "ok"
                })
            );
        });
    });
};

exports.rastrear = function(req, res) {
    chaves.checa_key(req, res, () => {
        dbPromise.promise.then(banco => {
            Promise.all([
                banco.all("SELECT * FROM Historico where codigo_rastreio = ? ORDER BY data desc;", [req.params.codigoRastreio]),
                banco.get("SELECT * FROM Entrega where codigo_rastreio = ?", [req.params.codigoRastreio]),
            ]).then(results =>
                res.send(
                    {
                        status: "ok",
                        idProduto: results[1].idProduto,
                        tipoEntrega: results[1].tipoEntrega,
                        cepOrigem: results[1].cepOrigem,
                        cepDestino: results[1].cepDestino,
                        peso: results[1].peso,
                        tipoPacote: results[1].tipoPacote,
                        altura: results[1].altura,
                        largura: results[1].largura,
                        comprimento: results[1].comprimento,
                        historicoRastreio: results[0].map(row =>
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
    });
};
