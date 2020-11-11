//VALIDATION
const Joi = require('@hapi/joi'); 


//REGISTER VALIDATION
const registerValidation = data =>
{
    const schema = {
        username: Joi
            .string().min(4)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema) 
}

//LOGIN VALIDATION
const loginValidation = data =>
{
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema) 
}


module.exports.registerValidation = registerValidation; 
module.exports.loginValidation = loginValidation; 
