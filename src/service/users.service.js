const User = require('../model/user.model');
class UserService {
  async createUser(user_name,password) {
    //写入数据库
    const res = await User.create({ user_name,password });
    return res.dataValues
  }
  async getUserInfo({...rest}){
    const whereOpt = {...rest};
    const res = await User.findOne({ 
      attributes:['id','user_name','password','is_admin'],
      where: whereOpt
    });
    return res?.dataValues||null;
  }
}

module.exports = new UserService()
