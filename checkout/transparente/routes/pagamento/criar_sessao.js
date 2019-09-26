const pagseguro = require("../../app/conf");
module.exports = (app) => {
  app.get('/api/session', (req, res, next) => {
    pagseguro.inicia_sessao()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};