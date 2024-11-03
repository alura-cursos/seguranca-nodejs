const { verify, decode } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send('Access token nao informado')
    }

    const [, accessToken] = token.split(" ")

    try {
        verify(accessToken, jsonSecret.secret)

        const { id, email} = await decode(accessToken)

        req.usuarioId = id
        req.usuarioEmail = email

        return next()
    } catch (error) {
        res.status(401).send('Usuario não autorizado')
    }
}