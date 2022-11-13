const Joi = require('joi');

// 注册相关schema 
const schemaRegister = Joi.object({
    user_name: Joi.string()
        .min(3)
        .max(30)
        .required().messages({
            "string.min": "用户名最少3个字符",
            "string.max": "用户名最多30个字符",
            "string.empty": "user_name is required.",
        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required().messages({
            "string.empty": "password is required.",
        }),
})

module.exports = {schemaRegister};