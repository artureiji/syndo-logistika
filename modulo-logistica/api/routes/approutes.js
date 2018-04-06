'use strict';
module.exports = function(app) {
  const controller = require('../controllers/correiosController');

  app.route('/rastrearpedido/:idPedido')
    .get(controller.rastrear_pedido);
}
