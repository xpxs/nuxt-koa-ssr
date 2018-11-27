'use strict'
import mysql from '../common/mysql' // 引入MySQL数据库

const userSchema = '../server/schema/user.js' // 引入user的表结构
const User = mysql.import(userSchema) // 将Sequelize与表结构对应

export async function getUsersCount(pageNum, pageSize) {
  return await User.findAndCountAll({
    where: {
      unable: '1'
    },
    limit: pageSize,
    offset: (pageNum - 1) * pageSize
  })
}

export async function getUserById(id) {
  return await User.findOne({
    where: {
      user_id: id,
      unable: '1'
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
      user_name: username,
      unable: '1'
    }
  })
}

export async function addUser(values) {
  return await User.upsert(values)
}

export async function updateUser(values) {
  return await User.update(values, {
    where: {
      user_id: values.user_id
    }
  })
}
