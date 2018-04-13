'use strict';
module.exports = function(app) {
  const entrega = require('../controllers/entregaController');
  const pedido = require('../controllers/pedidoController');
  const pacote = require('../controllers/pacoteController');
  const frete = require('../controllers/freteController');

  app.route('/rastrearentrega/:codigoRastreio')
    .get(controller.rastrear_entrega);

  app.route('/rastrearpedido/:idPedido')
    .get(controller.rastrear_pedido);

  app.route('/cadastrarpacote')
    .post(controller.cadastrar_pacote);

  app.route('/calculafrete')
    .get(controller.calcular_frete);
}
