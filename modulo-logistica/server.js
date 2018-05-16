var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var db = require('./api/services/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

var routes = require('./api/routes/approutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('modulo de logistica iniciou na porta: ' + port);
