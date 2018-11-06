module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      //用户ID
      user_id: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        primaryKey: true
      },
      //用户组ID
      group_id: {
        type: DataTypes.CHAR(8),
        allowNull: true,
        defaultValue: ''
      },
      //用户名
      user_name: {
        type: DataTypes.STRING(32),
        allowNull: true,
        defaultValue: ''
      },
      //用户密码
      user_pwd: {
        type: DataTypes.STRING(32),
        allowNull: true,
        defaultValue: ''
      },
      //用户手机号码
      user_phone: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        defaultValue: ''
      },
      //用户性别
      user_sex: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: '1'
      },
      //用户qq
      user_qq: {
        type: DataTypes.STRING(9),
        allowNull: true,
        defaultValue: ''
      },
      //用户email
      user_email: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: ''
      },
      //用户地址
      user_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      //用户积分
      user_mark: {
        type: DataTypes.CHAR(8),
        allowNull: true,
        defaultValue: ''
      },
      //用户等级
      user_rank_id: {
        type: DataTypes.INTEGER(),
        allowNull: true,
        defaultValue: ''
      },
      //用户上一次登录时间
      user_last_login_ip: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: ''
      },
      //用户生日
      user_birthday: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue: ''
      },
      //用户自我描述
      user_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      //用户头像存储路径
      user_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      //用户毕业学校
      user_school: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      //用户注册时间
      user_register_time: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue: ''
      },
      //用户注册时IP
      user_register_ip: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: ''
      },
      //用户上次更新博客时间
      user_last_update_time: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue: ''
      },
      //用户微博
      user_weibo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      //用户血型
      user_blood_type: {
        type: DataTypes.STRING(3),
        allowNull: true,
        defaultValue: ''
      },
      //用户语录
      user_says: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      //用户锁定
      user_lock: {
        type: DataTypes.CHAR(3),
        allowNull: true,
        defaultValue: 1
      },
      //用户冻结
      user_freeze: {
        type: DataTypes.CHAR(3),
        allowNull: true,
        defaultValue: 1
      },
      //用户拥有权限
      user_power: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 1
      }
    },
    {
      tableName: 'user'
    }
  )
}
