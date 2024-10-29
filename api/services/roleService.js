const database = require('../models')
const uuid = require('uuid')
class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })
        if (role) {
            throw new Error('Role já cadastrada')
        }
        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })
            return newRole
        } catch (error) {
            throw new Error('Erro ao cadastrar role')
        }
    }

    async buscarTodasRoles() {
        const roles = await database.roles.findAll()
        return roles
    }
    async buscarRolePorId(id) {
        const role = await database.roles.findOne({         
            where: {
                id: id
            }
        })
        if (!role) {
            throw new Error('Role informada não cadastrada!')
        }
        return role
    }
    async deletarRolePorId(id) {
        const role = await database.roles.findOne({
            where: {
                id: id
            }
        })
        if (!role) {
            throw new Error('Role informada não cadastrada!')
        }
        try {
            await database.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error
        }
    }
    async editarRole(dto) {
        const role = await database.roles.findOne({
            where: {
                id: dto.id
            }
        })
        if (!role) {
            throw new Error('Role informada não cadastrada!')
        }
        try {
            role.nome = dto.nome,
            role.descricao = dto.descricao
            await role.save()
            return await role.reload()
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error
        }
    }
}
module.exports = RoleService