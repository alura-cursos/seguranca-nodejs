const database = require("../models");
const { hash } = require("bcryptjs");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    try {
      const usuario = await database.usuarios.findOne({
        where: { email: dto.email },
      });

      if (usuario) {
        throw new Error("Usuário já cadastrado com este email");
      }

      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (error) {
      throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
    }
  }

  async buscarTodos() {
    try {
      return await database.usuarios.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const usuario = await database.usuarios.findByPk(id);
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }
      return usuario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async atualizar(id, dto) {
    try {
      const usuario = await database.usuarios.findByPk(id);
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      await database.usuarios.update(dto, { where: { id } });

      return await this.buscarPorId(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      const usuario = await database.usuarios.findByPk(id);
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      await database.usuarios.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}

module.exports = UsuarioService;
