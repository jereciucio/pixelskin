const Joi = require('joi');

const postSchema = Joi.object({
    displayName: Joi.string()
        .min(2)
        .max(32)
        .trim()
        .messages({
            'string.min': 'The displayName field must be between 2 and 16 characters.',
            'string.max': 'The displayName field must be between 2 and 16 characters.',
            'any.required': 'The displayName field is required.'
        }),
    description: Joi.string()
        .trim()
        .max(500)
        .required()
	.messages({
	    'string.max' : 'The description field must be shorter than 500 characters.',
	    'any.required' : 'The description field is required.'
	}),
    isSlim: Joi.bool()
	.required()
	.messages({
	    'boolean.base': 'The isSlim field must be a boolean.',
	    'any.required' : 'The isSlim field is required.'
	}),
    skinImage: Joi.string()
	.base64()
	.required()
	.messages({
	    'string.base64' : 'The skinImage field must be a valid base64 encoded image.',
	    'any.required' : 'The skinImage field is required'
	})
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
