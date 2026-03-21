const UsuarioService = require("../services/usuarioService");

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async buscarTodos(req, res) {
    try {
      const usuarios = await usuarioService.buscarTodos();
      res.status(200).send(usuarios);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const usuario = await usuarioService.buscarPorId(id);
      res.status(200).send(usuario);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
      const usuarioAtualizado = await usuarioService.atualizar(id, {
        nome,
        email
      });
      res.status(200).send(usuarioAtualizado);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      await usuarioService.deletar(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
