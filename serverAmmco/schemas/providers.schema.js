const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const address = Joi.string();
const contactPhone = Joi.number().integer();
const email = Joi.string();

const createProviderSchema = Joi.object({
  name: name.required(),
  address: address.required(),
  contactPhone: contactPhone.required(),
  email: email.required(),
});

const updateProviderSchema = Joi.object({
  name: name,
  address: address,
  contactPhone: contactPhone,
  email: email,
});

const getProviderSchema = Joi.object({
  id: id,
});

module.exports = {
  createProviderSchema,
  updateProviderSchema,
  getProviderSchema,
};
