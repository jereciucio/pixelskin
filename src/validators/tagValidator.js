const Joi = require('joi');

const tagSchema = Joi.object({
    displayName: Joi.string()
	.min(2)
	.max(16)
	.alphanum()
	.required()
	.trim()
	.uppercase()
	.messages({
	    'string.min': 'The displayName field must be between 2 and 16 characters.',
	    'string.max': 'The displayName field must be between 2 and 16 characters.',
	    'string.alphanum': 'The displayName field must only contion alphanumeric characters.',
	    'any.required': 'The displayName field is required'
	})
});

const validateTag = (req, res, next) => {
    const {error} = tagSchema.validate(req.body);

    if (error) {
	error.status = 400;
	error.message = error.details[0].message;
	return next(error); // Manda el error al errorHandler
    }

    next(); // Los datos son válidos, pasa al controlador
}

module.exports = validateTag;
