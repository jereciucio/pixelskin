const Joi = require('joi');

const tagSchema = Joi.object({
    displayName: Joi.string()
        .min(2)
        .max(32)
        .trim()
        .messages({
            'string.min': 'The displayName field must be between 2 and 16 characters.',
            'string.max': 'The displayName field must be between 2 and 16 characters.',
            'any.required': 'The displayName fiel is required'
        }),

    description: Joi.string()
        .trim()
        .max(500)
        .required(),

    skinType : Joi.number()
        .valid(0,1)
        .default(0)
});

const validatePost = (req, res, next) =>{
    const {error, value} = postSchema.validate(req.body,{"convert":true});

    if(error){
        error.status = 400;
        error.messages = error.details[0].message;
        return next(error);
    }
    req.body = value;
    
    next();
}

module.exports = validatePost;
