const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/transactions/detalhes', (req, res, next) => {
    pagseguro.detalhes_transacao(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};