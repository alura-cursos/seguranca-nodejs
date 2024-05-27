const database = require('../models')

const permissoes = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId,

            }
        })
        if (!usuario) {
            return res.status(401).send('Usuario não cadastrado')
        }

        const permissoesCadastradas = usuario.usuario_permissoes.map((permissao) => permissao.nome).some((permissao) => listaPermissoes.includes(permissao))

        if (!permissoesCadastradas) {
            return res.status(401).send('Usuario não tem acesso a essa rota')
        }
        return next()
    }
}

module.exports = permissoes