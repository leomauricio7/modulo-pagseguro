const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/installments', (req, res, next) => {
    pagseguro.condicoes_de_pagamento(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};