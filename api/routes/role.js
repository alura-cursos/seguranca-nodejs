const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
    .post('/roles', RoleController.cadastrar)
    .get('/roles', RoleController.buscarTodasRoles)
    .get('/roles/id/:id', RoleController.buscarRolePorId)
    .delete('/roles/id/:id', RoleController.deletarRolePorId)
    .put('/roles/id/:id', RoleController.editarRole)

module.exports = router