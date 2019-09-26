const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/cards', (req, res, next) => {
    pagseguro.token_do_cartao(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};