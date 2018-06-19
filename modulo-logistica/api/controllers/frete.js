"use strict";

const db = require("../services/database");
const endereco = require("../services/endereco");

exports.calcular = function(
  tipoEntrega,
  cepOrigem,
  cepDestino,
  peso,
  tipoPacote,
  altura,
  largura,
  comprimento
) {
  return Promise.all([
    endereco.consulta_cep(cepOrigem),
    endereco.consulta_cep(cepDestino)
  ])
    .then(results => {
      console.log(results[0], results[1]);

      return calcularDistancia(
        JSON.parse(results[0]).uf,
        JSON.parse(results[1]).uf
      ).then(distancia => {
        let volume = calcularVolume(tipoPacote, comprimento, altura, largura);

        let valor = determinaPreco(
          tipoEntrega,
          distancia,
          peso,
          tipoPacote,
          volume
        );
        let prazo = determinaPrazo(tipoEntrega, distancia);

        return { preco: valor.toString(), prazo: prazo.toString() };
      });
    })
    .catch(error => {
      console.log(error);
      if (error.statusCode === 404)
        throw { message: "CEP Inválido", status: 404 };
      throw { message: "Erro desconhecido", status: 500 };
    });
};

exports.reqCalcular = function(req, res) {
  let {
    tipoEntrega,
    cepOrigem,
    cepDestino,
    peso,
    tipoPacote,
    altura,
    largura,
    comprimento
  } = req.query;

  exports
    .calcular(
      tipoEntrega,
      cepOrigem,
      cepDestino,
      peso,
      tipoPacote,
      altura,
      largura,
      comprimento
    )
    .then(frete => res.send(frete))
    .catch(error => {
      console.log(error);
      return res.status(error.status).send({ message: error.message });
    });
};

exports.reqCalcularTodosTipos = function(req, res) {
  let {
    cepOrigem,
    cepDestino,
    peso,
    tipoPacote,
    altura,
    largura,
    comprimento
  } = req.query;
  return Promise.all([
    exports.calcular(
      "PAC",
      cepOrigem,
      cepDestino,
      peso,
      tipoPacote,
      altura,
      largura,
      comprimento
    ),
    exports.calcular(
      "SEDEX",
      cepOrigem,
      cepDestino,
      peso,
      tipoPacote,
      altura,
      largura,
      comprimento
    )
  ])
    .then(results => res.send({ pac: results[0], sedex: results[1] }))
    .catch(error => res.status(error.status).send({ message: error.message }));
};

function calcularDistancia(ufOrigem, ufDestino) {
  console.log(ufOrigem, ufDestino);
  return db.client
    .query(
      "select distancia from distancia where uf_origem = $1 AND uf_destino=$2",
      [ufOrigem, ufDestino]
    )
    .then(rows => rows.rows[0].distancia);
}

function calcularVolume(formato, comprimento, altura, largura) {
  let volume = 0;
  if (formato === "Caixa") {
    volume = comprimento * altura * largura;
  } else if (formato === "Rolo") {
    volume = altura * 3.14159 * comprimento;
  } else if (formato === "Carta") {
    volume = largura * altura * 1; // Volume não é importante nesse caso, só aplica um fator de redução de volume
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
  peso = peso * 0.2;
  if (peso > 1000) peso = 1000 + (peso - 1000) * 0.3;
  if (peso > 10000) peso = 10000 + (peso - 10000) * 0.5;
  if (peso > 100000) peso = 100000 + (peso - 100000) * 0.5;
  volume = volume * 0.3;
  if (volume > 1000) volume = 1000 + (volume - 1000) * 0.3;
  if (volume > 10000) volume = 10000 + (volume - 10000) * 0.3;
  if (volume > 100000) volume = 100000 + (volume - 100000) * 0.3;
  if (volume > 1000000) volume = 1000000 + (volume - 1000000) * 0.3;
  switch (tipo) {
    case "PAC":
      return Math.round(
        400 + (peso / 1 + volume / 100) * (1 + distancia / 2000)
      ); // 1Kg = R$10, 10x10x10cm = R$1
    case "SEDEX":
      return Math.round(
        1000 + 1.3 * (peso / 1 + volume / 100) * (1 + distancia / 2000)
      );
    default:
      return -1;
  }
}

function determinaPrazo(tipo, distancia) {
  switch (tipo) {
    case "PAC":
      return Math.round((distancia + 1) / 100 + 10);
    case "SEDEX":
      return Math.round((distancia + 1) / 1000 + 3);
    default:
      return -1;
  }
}
