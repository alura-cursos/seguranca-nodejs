const SegurancaService = require("../services/segurancaService");

const segurancaService = new SegurancaService();

class SegurancaController {
  static async cadastrar(req, res) {
    const { roles, permissoes } = req.body;
    const { usuarioId } = req;

    try {
      const acl = await segurancaService.cadastrar({
        roles,
        permissoes,
        usuarioId,
      });
      res.status(201).send(acl);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async cadastrarPermissaoRoles(req, res) {
    const { roleId, permissoes } = req.body;

    try {
      const permissaoRoles = await segurancaService.cadastrarPermissaoRoles({
        roleId,
        permissoes,
      }); 
      
      res.status(201).send(permissaoRoles);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = SegurancaController;
