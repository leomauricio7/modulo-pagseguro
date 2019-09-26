const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const load = require('express-load');

const app = express();
const http = require('http').Server(app);

app.use(morgan('dev'));
// aply put and delete to express
app.use(methodOverride('X-HTTP-Method-Override'));
// public directory
app.use(express.static(path.join(__dirname, '/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: 'true' }));
// parse application/json
app.use(bodyParser.json({ limit: '20mb' }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Fix the CROSS problems
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Carregando todos os controllers.
load('routes').into(app);

// Capturando erros.
app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

// Porta e IP para iniciar servidor.
const serverPort = process.env.PORT || 8000;

http.listen(serverPort, () => {
  console.log(`Service rodando na porta ${serverPort}`);
});
