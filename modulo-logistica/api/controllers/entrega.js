'use strict';

const db = require('../services/database');
const uuidv1 = require('uuid/v1');
const frete = require('./frete');
const chaves = require('../controllers/chaves');
const historico = require('./historico');

exports.cadastrar = function(req, res) {
    chaves.checa_key(req, res).then((key) => {
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
        db.client.query("INSERT INTO Entrega values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", [novoId,idProduto,tipoEntrega,valor,cepOrigem,cepDestino,peso,tipoPacote,altura,largura,comprimento,key])
        .then(rows => {
            historico.inserir(novoId, "Central de postagem de Barão Geraldo", (new Date()).toISOString(), "Aguardando Processamento", chaves.rootKey);
            return res.send({
                status: "ok",
                codigoRastreio: novoId
            });
        });
    });
};

exports.rastrear = function(req, res) {
    chaves.checa_key(req, res).then( (key) => {
        console.log("checou key", key);
        Promise.all([
            db.client.query("SELECT * FROM Historico where codigo_rastreio = $1 AND api_key = $2 ORDER BY data desc", [req.params.codigoRastreio, key]),
            db.client.query("SELECT * FROM Entrega where codigo_rastreio = $1 AND api_key = $2", [req.params.codigoRastreio, key]),
        ]).then(results =>
            {return res.send(
                {
                    status: "ok",
                    idProduto: results[1].rows[0].id_produto,
                    tipoEntrega: results[1].rows[0].tipo_entrega,
                    preco: results[1].rows[0].valor,
                    cepOrigem: results[1].rows[0].cep_origem,
                    cepDestino: results[1].rows[0].cep_destino,
                    peso: results[1].rows[0].peso,
                    tipoPacote: results[1].rows[0].tipo_pacote,
                    altura: results[1].rows[0].altura,
                    largura: results[1].rows[0].largura,
                    comprimento: results[1].rows[0].comprimento,
                    historicoRastreio: results[0].rows.map(row =>
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
};
