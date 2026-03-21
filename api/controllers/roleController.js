const RoleService = require("../services/roleService");

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;
    try {
      const role = await roleService.cadastrar({ nome, descricao });
      return res.status(201).send(role);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodos(req, res) {
    try {
      const roles = await roleService.buscarTodos();
      return res.status(200).send(roles);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  static async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.buscarPorId(id);
      return res.status(200).send(role);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      await roleService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const roleAtualizada = await roleService.atualizar(id, {
        nome,
        descricao,
      });
      return res.status(200).send(roleAtualizada);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
