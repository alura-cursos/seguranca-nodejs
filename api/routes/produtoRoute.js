const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')

const router = Router()

router
  .post('/produto', ProdutoController.cadastrarProduto)
  .get('/produto', ProdutoController.buscarTodosProdutos)
  .get('/produto/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/:id', ProdutoController.editarProduto)

module.exports = router