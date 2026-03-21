const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

class AuthService {
  async login(dto) {
    const usuario = await database.usuarios.findOne({
      attributes: ["id", "email", "senha"],
      where: { email: dto.email },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      throw new Error("Uusuário ou senha inválidos");
    }

    const token = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}

module.exports = AuthService;
