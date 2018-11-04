import Sequelize from 'sequelize'
import { CONFIG_DB } from '../config/CONFIG_DB'

const mysql = new Sequelize(
  CONFIG_DB.mysql.database,
  CONFIG_DB.mysql.user,
  CONFIG_DB.mysql.password,
  {
    host: CONFIG_DB.mysql.host,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

mysql
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
export default mysql
