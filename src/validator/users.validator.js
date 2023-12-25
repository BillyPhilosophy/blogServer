const Joi = require('joi');

// 注册相关schema 
const schemaRegister = Joi.object({
    username: Joi.string()
        .min(6)
        .max(16)
        .required().messages({
            "string.min": "用户名最少6个字符",
            "string.max": "用户名最多16个字符",
            "string.empty": "username is required.",
        }),
    password: Joi.string()
        .min(6)
        .max(16)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,16}$'))
        .required().messages({
            "string.min": "密码设置最少6个字符",
            "string.max": "密码设置最多16个字符",
            "string.empty": "password is required.",
        }),
})

module.exports = {schemaRegister};