'use strict';

const database = require('../services/database');
const uuidv1 = require('uuid/v1');
const frete = require('./frete');

exports.cadastrar = function(req, res) {
    // TODO: CHECAR api_key
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
    } = req.params;
    const valor = frete.calcular(tipoEntrega, cepOrigem, cepdecepDestinostino, quantidade, peso, formato, comprimento, altura, largura, diametro);
    banco.run("INSERT INTO Entrega values(?,?,?,?,?,?,?,?,?,?,?,?);", [novoId,idProduto,tipoEntrega,valor,cepOrigem,cepDestino,peso,tipoPacote,altura,largura,comprimento,apiKey],
        (err, rows) => res.send(
            {
                status: "ok"
            }
        )
    );
}

exports.rastrear = function(req, res) {
    // TODO: CHECAR api_key
    // TODO: consultar dados da entrega também para retornar
    database.dbConnection(banco => {
        banco.all("SELECT * FROM Historico where codigo_rastreio = ? ORDER BY data desc;", [req.params.codigoRastreio],
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
