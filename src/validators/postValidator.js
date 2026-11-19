const Joi = require('joi');

const postSchema = Joi.object({
    displayName: Joi.string()
        .min(2)
        .max(32)
        .trim()
        .messages({
            'string.min': 'The displayName field must be between 2 and 16 characters.',
            'string.max': 'The displayName field must be between 2 and 16 characters.',
            'any.required': 'The displayName field is required'
        }),
    description: Joi.string()
        .trim()
        .max(500)
        .required(),
    isSlim: Joi.bool().required(),
    skinImage: Joi.string().base64()
});

const validatePost = (req, res, next) =>{
    const {error, value} = postSchema.validate(req.body,{"convert":true});

    if(error){
        error.status = 400;
        error.message = error.details[0].message;
        return next(error);
    }
    req.body = value;

    next();
}

module.exports = validatePost;
