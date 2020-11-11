 const Joi = require ('joi')
 const validateRequest = require ('./validateRequest')
 
module.exports = {
    loginValidator: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        validateRequest(req, next, schema);
     },
     registerValidator: (req, res, next)=>{
        const schema = Joi.object({
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        validateRequest(req, next, schema);
     },
}



