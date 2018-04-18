'use strict';

const database = require('../services/database');

exports.calcular = function(tipo, ceporigem, cepdestino, peso, formato, comprimento, altura, largura, diametro) {
    let valor = 0;
    let distancia = calcularDistancia(ceporigem, cepdestino);
    let volume = calcularVolume(formato, comprimento, altura, largura, diametro);

    valor = determinaPreco(tipo, distancia, peso, formato, volume);
    return valor
}

exports.reqCalcular = function(req, res) {

    console.log(req);

    let {tipo, ceporigem, cepdestino, quantidade, peso, formato, comprimento, altura, largura, diametro} = req.query;
    let valor = exports.calcular(tipo, ceporigem, cepdestino, peso, formato, comprimento, altura, largura, diametro);
    res.send(valor.toFixed(2).toString());
};

function calcularDistancia(cepOrigem, cepDestino) {
    return 100;
}

function calcularVolume(formato, comprimento, altura, largura, diametro) {
    let volume = 0;
    if (formato == 1) {
        volume = comprimento * altura * largura;
    } else if (formato == 2) {
        volume = comprimento * 3.14159 * diametro;
    } else if (formato == 3) {
        volume = 0.4; // Volume não é importante nesse caso, só aplica um fator de redução de preço
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
    let fator = tipo == 1 ? precoPac() : tipo == 2 ? precoSedex() : 0;

    let preco = fator * distancia * peso * volume;

    return preco;
}
