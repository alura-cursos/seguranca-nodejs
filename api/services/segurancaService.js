const database = require('../models')
const Sequelize = require('sequelize')

class SegurancaService {
    async cadastrarAcl(dto) {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.usuarioId
            }
        })

        if (!usuario) {
            throw new Error('Usuario não cadastrado')
        }

        const rolesCadastradas = await database.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        await usuario.removeUsuario_roles(usuario.usuario_roles)
        await usuario.removeUsuario_permissoes(usuario.usuario_permissoes)

        await usuario.addUsuario_roles(rolesCadastradas)
        await usuario.addUsuario_permissoes(permissoesCadastradas)

        const novoUsuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as:'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }, 
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        })

        return novoUsuario
    }

    async cadastrarPermissoesRoles(dto) {
        const role = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        if (!role) {
            throw new Error('Role não cadastrada')
        }

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })
        
        await role.removeRoles_das_permissoes(role.roles_das_permissoes)

        await role.addRoles_das_permissoes(permissoesCadastradas)

        const novaRole = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        return novaRole
    }
}

module.exports = SegurancaService