const { Router } = require('express')
const router = Router();

router
  .post('/permissoes')
  .get('/permissoes')
  .get('/permissoes/:id')
  .put('/permissoes/:id')
  .delete('/permissoes/:id')

module.exports = router