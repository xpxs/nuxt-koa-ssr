module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'user'
  });
}