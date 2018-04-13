'use strict';
module.exports = function(app) {
  const entrega = require('../controllers/entrega');
  const pedido = require('../controllers/pedido');
  const pacote = require('../controllers/pacote');
  const frete = require('../controllers/frete');

  app.route('/rastrearentrega/:codigoRastreio')
    .get(entrega.rastrear);

  app.route('/rastrearpedido/:idPedido')
    .get(pedido.rastrear);

  app.route('/cadastrarpacote')
    .post(pacote.cadastrar);

  app.route('/calculafrete')
    .get(frete.calcular);
}
