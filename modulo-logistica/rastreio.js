function rastrearentrega(cod_rastreio) {

  sql = "SELECT * FROM Rastreio where codigo = '" + cod_rastreio + "' ORDER BY codigo;";
 
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.codigo);
      console.log(row.endereco);
      console.log(row.data);
      console.log(row.mensagem);
    });
  }); 	

}

function criartabela() {

  db.run("CREATE TABLE Rastreio (codigo VARCHAR(7), endereco VARCHAR(50), data DATE, mensagem VARCHAR(100));", (err) => {
    if (err) 
      return console.error(err.message);
    console.log('Tabela Rastreio criada.');	
  });

}

function inserirregistro() {

  db.run("INSERT INTO Rastreio (codigo, endereco, data, mensagem) VALUES ('BR10024', 'Unicamp Campinas', date('now'), 'Entregue com sucesso');", function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Um registro foi inserido.");
  });

}

function fecharconexao() {

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });

}


const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./banco.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conectado ao banco mc851 SQlite.');
});

//criartabela(); -- Tabela já está criada

inserirregistro();

rastrearentrega('BR10024');

fecharconexao();




//Exemplo Hello World, acessar: http://localhost:8080/ 

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.JS!');
  res.end(rastrearentrega(10));
}).listen(8080);
console.log('Server running at http://localhost:8080/');