const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.post('/api/transactions/refunds/total', (req, res, next) => {
    pagseguro.estorno_total(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};