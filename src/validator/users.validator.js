const Joi = require('joi');

// 注册相关schema 
const schemaRegister = Joi.object({
    user_name: Joi.string()
        .min(2)
        .max(20)
        .required().messages({
            "string.min": "用户名最少2个字符",
            "string.max": "用户名最多20个字符",
            "string.empty": "user_name is required.",
        }),
    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
        .required().messages({
            "string.min": "密码设置最少6个字符",
            "string.max": "密码设置最多20个字符",
            "string.empty": "password is required.",
        }),
})

module.exports = {schemaRegister};