'use strict'
import mysql from '../common/mysql' // 引入MySQL数据库

const userSchema = '../server/schema/user.js' // 引入user的表结构
const User = mysql.import(userSchema) // 将Sequelize与表结构对应

export async function getUserById(id) {
  return await User.findOne({
    where: {
      id
    }
  })
}

export async function getUserByName(username) {
  return await User.findOne({
    where: {
      username
    }
  })
}
