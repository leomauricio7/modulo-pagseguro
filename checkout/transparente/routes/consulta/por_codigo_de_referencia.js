const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/transactions/reference', (req, res, next) => {
    pagseguro.detalhes_transacao_por_referencia(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};