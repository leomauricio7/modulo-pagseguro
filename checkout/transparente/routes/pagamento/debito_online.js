const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.post('/api/checkout/debito', (req, res, next) => {
    pagseguro.debito(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};