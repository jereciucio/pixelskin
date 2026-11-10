const Joi = require('joi');

const userSchema = Joi.object({
    userEmail: Joi.string()
    .email()
    .required()
    .trim()
    .message({
        'string.email': 'The email address entered is not valid',
        'any.required': 'The email field is required',
    }),
    userName: Joi.string()
    .min(4)
    .max(24)
    .alphanum()
    .required()
    .trim()
    .message({
        'string.min': 'The userName field must be between 4 and 24 characters.',
        'string.max': 'The userName field must be between 4 and 24 characters.',
        'string.alphanum': 'The userName field must only contion alphanumeric characters.',
        'any.required': 'The userName field is required',
    })
});

const validateUser = (req, res, next) => {
    const {error, value} = userSchema.validate(reg.body, {"convert": true});

    if (error) {
        error.status = 400;
        error.message = error.details[0].message;
        return next(error); // Manda el error al errorHandler
    }

    // Si no había errores, guarda el objeto reformateado
    req.body = value;

    next(); // Los datos son válidos, pasa al controlador
}

module.exports = validateUser;