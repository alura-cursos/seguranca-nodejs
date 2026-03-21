const { Router } = require("express");

const router = Router();

const RoleController = require("../controllers/roleController");

router
  .post("/role", RoleController.cadastrar)
  .get("/role", RoleController.buscarTodos)
  .get("/role/id/:id", RoleController.buscarPorId)
  .delete("/role/id/:id", RoleController.deletar)
  .put("/role/id/:id", RoleController.atualizar);

module.exports = router;