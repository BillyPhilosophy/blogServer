module.exports={
    userParamError(MSG){
        return {
            returnCode:10001,
            returnMsg:MSG,
            body:null  
        }
    },
    userExistError:{
        returnCode:10002,
        returnMsg:'用户信息已存在',
        body:null  
    },
    userRegisterError:{
        returnCode:10003,
        returnMsg:'用户注册时发生错误',
        body:null 
    },
    userDoesNotExist: {
        returnCode: 10004,
        returnMsg: '用户不存在',
        body: null,
    },
    userLoginError: {
        returnCode: 10005,
        returnMsg: '用户登录失败',
        body: null,
    },
    invalidPassword: {
        returnCode: 10006,
        returnMsg: '用户名或密码不匹配',
        body: null,
    },
    pwdConsistencyError:{
        returnCode: 10007,
        returnMsg: '修改前后两次密码一致',
        body: null,
    },
    modifyPwdError:{
        returnCode: 10008,
        returnMsg: '修改密码失败',
        body: null,
    },
    getUserInfoError:{
        returnCode: 10009,
        returnMsg: '查询用户信息失败',
        body: null,
    },
    // 鉴权部分的erro
    tokenExpiredError:{
        returnCode: 10101,
        returnMsg: 'token已过期',
        body: null,
    },
    jsonWebTokenError:{
        returnCode: 10102,
        returnMsg: '无效的token',
        body: null,
    },
    notBeforeError:{
        returnCode: 10103,
        returnMsg: '非法token',
        body: null,
    }
}