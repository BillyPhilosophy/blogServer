const { use } = require('../app');
const User = require('../model/user.model');
class UserService {
  // 创建用户
  async createUser(user_name,password) {
    //写入数据库
    const res = await User.create({ user_name,password });
    return res.dataValues
  }
  // 获取用户
  async getUserInfo({...rest}){
    const whereOpt = {...rest};
    const res = await User.findOne({ 
      attributes:['id','user_name','password','is_admin'],
      where: whereOpt
    });
    return res?.dataValues||null;
  }
  // 根据ID修改yion
  async updateById(id,{...rest}){
    const whereOpt = {id};
    const updateOpt = rest;
    const res = await User.update(updateOpt,{ 
      where: whereOpt
    });
    console.log(res);
    return res[0]>0;
  }
}

module.exports = new UserService()
