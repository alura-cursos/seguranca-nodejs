const dotenv = require('dotenv');

dotenv.config();

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente '${key}' não foi definida`);
  }
  return value;
};

module.exports = {
  jwtSecret: required('JWT_SECRET'),
};
