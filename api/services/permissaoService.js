const database = require("../models");
const uuid = require("uuid");

class PermissaoService {
  async cadastrar(dto) {
    try {
      const permissaoExistente = await database.permissoes.findOne({
        where: { nome: dto.nome },
      });

      if (permissaoExistente) {
        throw new Error("Permissão já cadastrada com este nome");
      }

      const novaPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return novaPermissao;
    } catch (error) {
      throw new Error(`Erro ao cadastrar permissão: ${error.message}`);
    }
  }

  async buscarTodos() {
    try {
      const permissoes = await database.permissoes.findAll();
      return permissoes;
    } catch (error) {
      throw new Error(`Erro ao buscar permissões: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const permissao = await database.permissoes.findOne({ where: { id } });
      if (!permissao) {
        throw new Error("Permissão não encontrada");
      }
      return permissao;
    } catch (error) {
      throw new Error(`Erro ao buscar permissão: ${error.message}`);
    }
  }

  async atualizar(id, dto) {
    try {
      const permissao = await database.permissoes.findByPk(id);
      if (!permissao) {
        throw new Error("Permissão não encontrada");
      }

      await database.permissoes.update(dto, { where: { id } });

      return await this.buscarPorId(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar permissão: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      const permissao = await database.permissoes.findByPk(id);
      if (!permissao) {
        throw new Error("Permissão não encontrada");
      }

      await database.permissoes.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Erro ao deletar permissão: ${error.message}`);
    }
  }
}

module.exports = PermissaoService;
