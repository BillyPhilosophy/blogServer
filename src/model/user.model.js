const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const User = seq.define('blog_user', {
    // 在这里定义模型属性
    userNo: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      comment:'用户名，唯一值'
    },
    nick_name:{
        type: DataTypes.STRING,
        comment:'昵称（可以为空可以后期更改）',
        defaultValue:`大佬${new Date().getTime()+Math.floor(Math.random()*1000)}`
    },
    avatar:{
        type: DataTypes.STRING,
        comment:'用户头像地址',
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员 0: 不是管理员(默认) 1: 是管理员 8: root管理员',
    },
    introduce:{
        type:DataTypes.STRING(512),
        comment:'个人概括'
    },
    banner:{
        type:DataTypes.STRING,
        comment:'个人banner图地址'
    },
    gender:{
        type:DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: '2',
        comment: '性别, 0: 女生; 1: 男生,2:保密(默认值)'
    },
    email:{
        type:DataTypes.STRING,
        comment:'个人邮箱地址'
    },
    date:{
        type:DataTypes.CHAR(8),
        comment:'个人生日（8位的YYYYMMdd）'
    }

});
User.sync();
// User.sync({ force: true });//创建表,如果表已经存在,则将其首先删除(表结构发生变化时调用)
module.exports = User