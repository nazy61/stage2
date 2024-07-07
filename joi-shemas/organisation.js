const Joi = require("joi");

module.exports.orgSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  description: Joi.string().optional(),
});

module.exports.addUserSchema = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
});
