'use strict';

const database = require('../services/database');

exports.calcular = function(req, res) {
    let valor = 0;
    console.log(req);

    let {tipo, ceporigem, cepdestino, quantidade, peso, formato, comprimento, altura, largura, diametro} = req.query;

    let distancia = calcularDistancia(ceporigem, cepdestino);
    let volume = calcularVolume(formato, comprimento, altura, largura, diametro);

    valor = determinaPreco(tipo, distancia, quantidade, peso, formato, volume);
    
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

function determinaPreco(tipo, distancia, quantidade, peso, formato, volume) {
    let fator = tipo == 1 ? precoPac() : tipo == 2 ? precoSedex() : 0;

    let preco = fator * distancia * peso * volume * Math.max((quantidade * ((quantidade - 1) * 0.7)), 1);

    return preco;
}