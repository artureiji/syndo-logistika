var express = require('express');

const app = express();
const port = process.env.PORT || 3000;


var routes = require('./api/routes/approutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
