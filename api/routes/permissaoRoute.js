const { Router } = require('express')
const PermissaoController = require('../controllers/permissaoController')

const router = Router();

router
  .post('/permissoes', PermissaoController.cadastrar)
  .get('/permissoes', PermissaoController.buscarTodasPermissoes)
  .get('/permissoes/:id', PermissaoController.buscarPermissaoPorId)
  .put('/permissoes/:id', PermissaoController.editarPermissao)
  .delete('/permissoes/:id', PermissaoController.deletarPermissaoPorId)

module.exports = router