const User = require('../model/user.model');
class UserService {
  // 创建用户
  async createUser(user_name,password) {
    //写入数据库
    const res = await User.create({ user_name,password });
    return res.dataValues
  }
  // 获取用户基础隐私信息
  async getUserPrivacyInfo({...rest}){
    const whereOpt = rest;
    const res = await User.findOne({ 
      attributes:['id','user_name','nick_name','password','role'],
      where: whereOpt
    });
    return res?.dataValues||null;
  }
  // 获取用户信息
  async getUserInfo({...rest},attributes){
    const whereOpt = rest;
    const res = await User.findOne({ 
      attributes,
      where: whereOpt
    });
    return res?.dataValues||null;
  }
  // 根据ID修改用户信息的通用接口
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
