const Joi = require("joi");

module.exports.userRegistrationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First Name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email Address must be a valid email",
    "any.required": "Email Address is required",
  }),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol (@$!%*?&). It must be at least 8 characters long.",
      "any.required": "Password is required",
    }),
  phone: Joi.string().optional(),
});

module.exports.userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email Address must be a valid email",
    "any.required": "Email Address is required",
  }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "Password is required" }),
});
