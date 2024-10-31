const { Router }  = require('express')
const UsuarioController = require('../controllers/usuarioController')
const autenticado = require('../midlleware/autenticado')

const router = Router();

router
  .post('/usuarios', UsuarioController.cadastrar)
router
  .use(autenticado)
router
  .get('/usuarios', UsuarioController.buscarTodosUsuarios)
  .get('/usuarios/:id', UsuarioController.buscarUsuarioPorId)
  .put('/usuarios/:id', UsuarioController.editarUsuario)
  .delete('/usuarios/:id', UsuarioController.deletarUsuario)

module.exports = router