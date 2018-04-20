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
        .post(historico.inserir);

    app.route('/calculafrete')
        .get(frete.calcular);

    app.route('/cadastrarchave')
        .post(chaves.criar);


}
