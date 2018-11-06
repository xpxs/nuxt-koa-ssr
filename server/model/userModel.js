'use strict'
import mysql from '../common/mysql' // 引入MySQL数据库

const userSchema = '../server/schema/user.js' // 引入user的表结构
const User = mysql.import(userSchema) // 将Sequelize与表结构对应

export async function getUserById(id) {
  return await User.findOne({
    where: {
      user_id
    }
  })
}
/**
 * [getUserByName 按用户名查找]
 * @Author   tanpeng
 * @DateTime 2018-11-06
 * @version  [v1.0]
 * @param    {[type]}   username [按照查找的用户名]
 * @return   {[type]}            [description]
 */
export async function getUserByName(username) {
  return await User.findOne({
    where: {
      user_name
    }
  })
}

export async function addOrUpdateUser(values) {
  return await User.upsert(values)
}
