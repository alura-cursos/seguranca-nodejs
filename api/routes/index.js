const bodyParser = require("body-parser");

const produto = require("./produtoRoute");
const usuario = require("./usuarioRoute");
const auth = require("./authRoute");
const role = require("./roleRoute");
const permissao = require("./permissaoRoute");
const seguranca = require("./segurancaRoute");

module.exports = (app) => {
  app.use(
    bodyParser.json(),
    auth,
    permissao,
    produto, 
    usuario,
    role,
    seguranca,
  );
};
