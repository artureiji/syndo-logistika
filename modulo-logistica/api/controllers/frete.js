'use strict';

const database = require('../services/database');

exports.calcular = function(req, res) {
    let valor = 0;
    console.log(req);

    let distancia = calcularDistancia(req.params.ceporigem, req.params.cepdestino);
    let volume = calcularVolume(req.params.formato, req.params.comprimento, req.params.altura, req.params.largura, req.params.diametro);

    valor = determinaPreco(req.params.tipo, distancia, req.params.quantidade, req.params.peso, req.params.formato, volume);
    res.send(valor);
};

function calcularDistancia(cepOrigem, cepDestino) {
    return 100;
}

function calcularVolume(formato, comprimento, altura, largura, diametro) {
    volume = 0;
    if (formato === 1) {
        volume = comprimento * altura * largura;
    } else if (formato === 2) {
        volume = comprimento * 3.14159 * diametro;
    } else if (formato === 3) {
        volume = 1; // Volume não é importante nesse caso
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
    fator = tipo === 1 ? precoPac() : tipo === 2 ? precoSedex() : 0;

    preco = fator * distancia * peso * volume * (quantidade * 0.7);

    if (formato === 1) {
        preco *= 0.4;
    }

    return preco;
}