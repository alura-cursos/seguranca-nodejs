const PermissaoService = require("../services/permissaoService");

const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    try {
      const { nome, descricao } = req.body;
      const permissao = await permissaoService.cadastrar({ nome, descricao });
      return res.status(201).send(permissao);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async buscarTodos(req, res) {
    try {
      const permissoes = await permissaoService.buscarTodos();
      return res.status(200).send(permissoes);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const permissao = await permissaoService.buscarPorId(id);
      return res.status(200).send(permissao);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const permissaoAtualizada = await permissaoService.atualizar(id, {
        nome,
        descricao
      });
      return res.status(200).send(permissaoAtualizada);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      await permissaoService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}

module.exports = PermissaoController;
