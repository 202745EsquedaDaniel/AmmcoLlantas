const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const model = Joi.string();
const price = Joi.number().integer();
const stock = Joi.number().integer();
const provider_ID = Joi.number().integer();

const createTireSchema = Joi.object({
  name: name.required(),
  model: model.required(),
  price: price.required(),
  stock: stock.required(),
  provider_ID: provider_ID.required(),
});

const updateTireSchema = Joi.object({
  name: name,
  model: model,
  price: price,
  stock: stock,
  provider_ID: provider_ID,
});

const getTireSchema = Joi.object({
  id: id,
});

module.exports = {
  createTireSchema,
  updateTireSchema,
  getTireSchema,
};
