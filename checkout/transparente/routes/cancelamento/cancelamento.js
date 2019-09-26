const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.post('/api/transactions/cancels', (req, res, next) => {
    pagseguro.cancelar_transacao(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};