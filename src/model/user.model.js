const { DataTypes } = require('sequelize');

const seq = require('../db/seq');


const User = seq.define('blog_user', {
    // 在这里定义模型属性
    // id是自动维护的自增
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      comment:'用户名，唯一值'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
    }
});
User.sync();

module.exports = User