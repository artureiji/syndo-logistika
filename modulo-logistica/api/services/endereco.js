var request = require('request-promise-native');


exports.consulta_cep = (cep) => request({
      method: 'GET',
      url: 'http://node.thiagoelg.com/paises/br/cep/'+(cep.replace("-","")),
      headers: {
        'x-api-key': '4b2e374d-9a16-4d94-94f4-38eb3a1cedaa'
    }}
);
