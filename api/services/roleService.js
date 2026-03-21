const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne({
      where: { nome: dto.nome },
    });

    if (role) {
      throw new Error("Role já cadastrada");
    }

    try {
      const newRole = await database.roles.create({
        id: uuidv4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newRole;
    } catch (error) {
      throw new Error("Erro ao cadastrar role");
    }
  }

  async buscarTodos() {
    try {
      const roles = await database.roles.findAll();
      return roles;
    } catch (error) {
      throw new Error("Erro ao buscar roles");
    }
  }

  async buscarPorId(id) {
    try {
      const role = await database.roles.findOne({ where: { id } });
      if (!role) {
        throw new Error("Role não encontrada");
      }
      return role;
    } catch (error) {
      throw new Error("Erro ao buscar role");
    }
  }

  async deletar(id) {
    try {
      const role = await database.roles.findByPk(id);
      if (!role) {
        throw new Error("Role não encontrada");
      }

      await database.roles.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Erro ao deletar role: ${error.message}`);
    }
  }

  async atualizar(id, dto) {
    try {
      const role = await database.roles.findByPk(id);
      if (!role) {
        throw new Error("Role não encontrada");
      }

      await database.roles.update(dto, { where: { id } });

      return await this.buscarPorId(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar role: ${error.message}`);
    }
  }
}

module.exports = RoleService;
