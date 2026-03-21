const { Router } = require("express");

const UsuarioController = require("../controllers/usuarioController");
const autenticado = require("../middlewares/autenticado");

const router = Router();

router
  .use(autenticado)
  .post("/usuario", UsuarioController.cadastrar)
  .get("/usuario", UsuarioController.buscarTodos)
  .get("/usuario/id/:id", UsuarioController.buscarPorId)
  .put("/usuario/id/:id", UsuarioController.atualizar)
  .delete("/usuario/id/:id", UsuarioController.deletar);

module.exports = router;
