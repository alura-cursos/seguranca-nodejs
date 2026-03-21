const { Router } = require("express");
const PermissaoController = require("../controllers/permissaoController");

const router = Router();

router
  .post("/permissao", PermissaoController.cadastrar)
  .get("/permissao", PermissaoController.buscarTodos)
  .get("/permissao/:id", PermissaoController.buscarPorId)
  .delete("/permissao/:id", PermissaoController.deletar)
  .put("/permissao/:id", PermissaoController.atualizar);

module.exports = router;
