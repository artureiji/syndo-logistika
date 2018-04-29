'use strict';
module.exports = function(app) {

    const entrega = require('../controllers/entrega');
    const frete = require('../controllers/frete');
    const historico = require('../controllers/historico');
    const chaves = require('../controllers/chaves');

    app.route('/rastrearentrega/:codigoRastreio')
        .get(entrega.rastrear);

    app.route('/cadastrarentrega')
        .post(entrega.cadastrar);

    app.route('/inserirhistorico')
        .post(historico.inserir_req);

    app.route('/calculafrete')
        .get(frete.reqCalcular);

    app.route('/cadastrarchave')
        .post(chaves.criar);


}
