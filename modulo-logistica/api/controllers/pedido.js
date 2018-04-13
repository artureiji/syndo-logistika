'use strict';

const database = require('../services/database');

exports.rastrear = function(req, res) {
  let pacotes = [];
  database.dbConnection(banco => {
      banco.serialize(() =>
          banco.all("SELECT * from Pedido where id_pedido = ?;", [req.params.idPedido],
              (err, pedido_rows) => {
                  pedido_rows.map((row, index)=> {
                      database.dbConnection((banco) => banco.all("SELECT * FROM Rastreio where codigo = ? ORDER BY data desc;", [row.codigo_rastreio],
                          (err, rows) => {
                              console.log('push na row', pedido_rows.length, index);
                              pacotes.push(
                                  {
                                      cod_rastreio: row.codigo_rastreio,
                                      historicoRastreio: rows.map(row_pacote =>
                                          ({
                                              hora: new Date(row_pacote.data).toISOString(),
                                              local: row_pacote.endereco,
                                              mensagem: row_pacote.mensagem
                                          })
                                      )
                                  }
                              );
                              if(pedido_rows.length ===  index + 1){
                                res.send({
                                    status: "ok",
                                    pacotes: pacotes
                                });
                              }
                          }
                      ));
                  });

              }
          )
      );


  });
};
