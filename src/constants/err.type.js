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
        returnCode: '10004',
        returnMsg: '用户不存在',
        body: null,
    },
    userLoginError: {
        returnCode: '10005',
        returnMsg: '用户登录失败',
        body: null,
    },
    invalidPassword: {
        returnCode: '10006',
        returnMsg: '密码不匹配',
        body: null,
    },
}