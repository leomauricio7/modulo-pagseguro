const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/payment-method', (req, res, next) => {
    pagseguro.metodos_de_pagamento(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};