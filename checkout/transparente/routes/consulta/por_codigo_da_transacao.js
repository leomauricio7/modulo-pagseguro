const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/transactions/code', (req, res, next) => {
    pagseguro.detalhes_transacao_por_code_transaction(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};