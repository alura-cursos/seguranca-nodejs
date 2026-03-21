const { verify } = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

module.exports = async (req, res, next) => {
  const authHeader  = req.headers["authorization"];

  if (!authHeader ) {
    return res.status(401).send({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, jwtSecret);

    req.usuarioId = decoded.id;
    req.usuarioEmail = decoded.email;

    return next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
};
