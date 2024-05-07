const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string();
const contactPhone = Joi.string()
const email = Joi.string().email();

const createCustomersSchema = Joi.object({
  name: name.required(),
  contactPhone: contactPhone.required(),
  email: email.required(),
});

const updateCustomersSchema = Joi.object({
  name: name.required(),
  contactPhone: contactPhone.required(),
  email: email.required(),
});

const getCustomersSchema = Joi.object({
  id: id
});

module.exports = {
  createCustomersSchema,
  updateCustomersSchema,
  getCustomersSchema,
};
