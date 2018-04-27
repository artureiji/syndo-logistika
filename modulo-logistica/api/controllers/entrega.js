'use strict';

const dbPromise = require('../services/database');
const uuidv1 = require('uuid/v1');
const frete = require('./frete');
const chaves = require('../controllers/chaves');

exports.cadastrar = function(req, res) {
    chaves.checa_key(req, res).then((key) => {
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
                comprimento
            } = req.body;
            const valor = frete.calcular(tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento);
            banco.run("INSERT INTO Entrega values(?,?,?,?,?,?,?,?,?,?,?,?);", [novoId,idProduto,tipoEntrega,valor,cepOrigem,cepDestino,peso,tipoPacote,altura,largura,comprimento,key])
            .then(rows => res.send(
                {
                    status: "ok",
                    codigoRastreio: novoId
                })
            );
        });
    });
};

exports.rastrear = function(req, res) {
    chaves.checa_key(req, res).then( (key) => {
        dbPromise.promise.then(banco => {
            console.log(req.params.codigoRastreio, key);
            Promise.all([
                banco.all("SELECT * FROM Historico where codigo_rastreio = ? AND api_key = ? ORDER BY data desc;", [req.params.codigoRastreio, key]),
                banco.get("SELECT * FROM Entrega where codigo_rastreio = ? AND api_key = ?", [req.params.codigoRastreio, key]),
            ]).then(results =>
                {console.log(results); return res.send(
                    {
                        status: "ok",
                        idProduto: results[1].id_produto,
                        tipoEntrega: results[1].tipo_entrega,
                        preco: results[1].valor,
                        cepOrigem: results[1].cep_origem,
                        cepDestino: results[1].cep_destino,
                        peso: results[1].peso,
                        tipoPacote: results[1].tipo_pacote,
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
                );}
            );
        });
    });
};
