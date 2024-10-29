const database = require('../models')
const { compare } = require('bcryptjs')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
  async login(dto) {
      const usuario = await database.usuarios.findOne({
          attributes: ['id', 'email', 'senha'],
          where: {
              email: dto.email
          }
      })

      if (!usuario) {
          throw new Error('Usuario não cadastrado')
      }

      let senhasIguais = compare(dto.senha, usuario.senha)

      if (!senhasIguais){
        throw new Error("Usuário o senha inválidos")
      }

      const accessToken = sign({
        id: usuario.id,
        email: usuario.email
      }, jsonSecret.secret, {
          expiresIn: 2678400
      })

      return accessToken
  }
}

module.exports = AuthService