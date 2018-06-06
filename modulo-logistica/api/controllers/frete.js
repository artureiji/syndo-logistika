'use strict';

const db = require('../services/database');
const endereco = require('../services/endereco');

exports.calcular = function(tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento) {
    return Promise.all([endereco.consulta_cep(cepOrigem), endereco.consulta_cep(cepDestino)])
        .then((results) => {
            console.log(results[0], results[1]);

            return calcularDistancia(JSON.parse(results[0]).uf, JSON.parse(results[1]).uf)
                .then(distancia => {
                    let volume = calcularVolume(tipoPacote, comprimento, altura, largura);

                    let valor = determinaPreco(tipoEntrega, distancia, peso, tipoPacote, volume);
                    let prazo = determinaPrazo(tipoEntrega, distancia);

                    return {preco: valor.toString(), prazo: prazo.toString()};
                });


        } )
        .catch(error => {
            if( error.statusCode === 404) throw {message: "CEP Inválido", status: 404};
            throw {message: "Erro desconhecido", status: 500};
        });
}

exports.reqCalcular = function(req, res) {

    let {tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento} = req.query;

    exports.calcular(tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento)
        .then((frete)=> res.send(frete)).catch(error => res.status(error.status).send({message: error.message}));
};

function calcularDistancia(ufOrigem, ufDestino) {
    console.log(ufOrigem,ufDestino);
    return db.client.query("select distancia from distancia where uf_origem = $1 AND uf_destino=$2", [ufOrigem,ufDestino])
        .then(rows => rows.rows[0].distancia)
}

function calcularVolume(formato, comprimento, altura, largura) {
    let volume = 0;
    if (formato === "Caixa") {
        volume = comprimento * altura * largura;
    } else if (formato === "Rolo") {
        volume = altura * 3.14159 * comprimento;
    } else if (formato === "Carta") {
        volume = largura*altura*1; // Volume não é importante nesse caso, só aplica um fator de redução de volume
    } else {
        console.log("Formato inválido: " + formato);
    }
    return volume;
}

function precoPac() {
    return 0.5;
}

function precoSedex() {
    return 2.0;
}

function determinaPreco(tipo, distancia, peso, formato, volume) {
    console.log(tipo, distancia, peso, formato, volume);
    switch(tipo) {
        case "PAC":
            return Math.round(400+ (peso / 1 + volume / 10) + (distancia+1)*100); // 1Kg = R$10, 10x10x10cm = R$1
        case "SEDEX":
            return Math.round(1000 + 1.3*(peso/1 + volume / 10) + (distancia+1)*500);
        default:
            return -1;
    }
}

function determinaPrazo(tipo, distancia) {
    switch(tipo) {
        case "PAC":
            return Math.round((distancia+1) / 3000 + 10);
        case "SEDEX":
            return Math.round((distancia+1) / 1000 + 3);
        default:
            return -1;
    }
}
