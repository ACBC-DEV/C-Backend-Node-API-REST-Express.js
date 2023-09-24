const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(10);
const role = Joi.string().min(3).max(10);
const createUserSchema = Joi.object({
  name: name.required(),
  role: role.required(),
});
const updateUserSchema = Joi.object({
  name,
  role,
});
const getUserSchema = Joi.object({
  id: id.required(),
});
module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
