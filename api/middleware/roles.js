const database = require('../models')

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(401).send('Usuario não cadastrado')
        }

        const rolesCadastradas = usuario.usuario_roles.map((role) => role.nome).some((role) => listaRoles.includes(role))

        if (!rolesCadastradas) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }
        return next()
    }
}

module.exports = roles