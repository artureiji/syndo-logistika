'use strict';

const database = require('../services/database');

exports.calcular = function(tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento) {
    let valor = 0;

    let distancia = calcularDistancia(cepOrigem, cepDestino);

    let volume = calcularVolume(tipoPacote, comprimento, altura, largura);

    valor = determinaPreco(tipoEntrega, distancia, peso, tipoPacote, volume);

    return valor;
}

exports.reqCalcular = function(req, res) {

    let {tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento} = req.query;
    let valor = exports.calcular(tipoEntrega, cepOrigem, cepDestino, peso, tipoPacote, altura, largura, comprimento);
    res.send({preco: valor.toString()});
};

function calcularDistancia(cepOrigem, cepDestino) {
    return 1;
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
            return Math.round(500+ (peso / 1 + volume / 10)); // 1Kg = R$10, 10x10x10cm = R$1
        case "SEDEX":
            return Math.round(1500 + 1.3*(peso/10 + volume / 10000));
        default:
            return -1;
    }
}
