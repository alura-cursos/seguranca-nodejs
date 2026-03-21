'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.usuarios, {
        through: models.usuarios_roles,
        as: 'role_usuarios',
        foreignKey: 'role_id'
      });
      roles.belongsToMany(models.permissoes, {
        through: models.roles_permissoes,
        as: 'role_permissoes', 
        foreignKey: 'role_id',
      });
      // define association here
    }
  }
  roles.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};