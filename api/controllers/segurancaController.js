const SegurancaService = require('../services/segurancaService')
const segurancaService = new SegurancaService()

class SegurancaController {
    static async cadastrarAcl(req, res) {
        const { roles, permissoes } = req.body
        const { usuarioId } = req

        try {
            const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId})

            res.status(201).send(acl)
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }

    static async cadastrarPermissoesRoles(req, res) {
        const { roleId, permissoes } = req.body

        try {
            const permissoesRole = await segurancaService.cadastrarPermissoesRoles({ roleId, permissoes})

            res.status(201).send(permissoesRole)
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }
}

module.exports = SegurancaController