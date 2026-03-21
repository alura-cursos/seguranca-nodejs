const database = require("../models");
const sequelize = require("sequelize");

class SegurancaService {
  async cadastrar(dto) {
    console.log("Cadastrando ACL com os dados:", dto);
    const usuario = await database.usuarios.findOne({
      where: { id: dto.usuarioId },
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    if (!usuario) {
      throw new Error("Usuário não cadastrado");
    }

    const roles = await database.roles.findAll({
      where: {
        id: {
          [sequelize.Op.in]: dto.roles,
        },
      },
    });

    const permissoes = await database.permissoes.findAll({
      where: {
        id: {
          [sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    await usuario.addUsuario_roles(roles);
    await usuario.addUsuario_permissoes(permissoes);

    const ususarioCadastrado = await database.usuarios.findOne({
      where: { id: dto.usuarioId },
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    if (!ususarioCadastrado) {
      throw new Error("Usuário não encontrado após cadastro");
    }

    return ususarioCadastrado;
  }

  async cadastrarPermissaoRoles(dto) {
    const role = await database.roles.findOne({
      where: { id: dto.roleId },
      include: [
        {
          model: database.permissoes,
          as: "role_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    if (!role) {
      throw new Error("Role não encontrada");
    }

    const permissoes = await database.permissoes.findAll({
      where: {
        id: {
          [sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await role.removeRole_permissoes(role.role_permissoes);

    await role.addRole_permissoes(permissoes);

    const roleCadastrada = await database.roles.findOne({
      where: { id: dto.roleId },
      include: [
        {
          model: database.permissoes,
          as: "role_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    if (!roleCadastrada) {
      throw new Error("Role não encontrada após cadastro");
    }

    return roleCadastrada;
  }
}

module.exports = SegurancaService;
