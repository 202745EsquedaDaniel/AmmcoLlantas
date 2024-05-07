const Joi = require('joi');

const id = Joi.number().integer()
const customer_ID = Joi.number().integer();
const date = Joi.date();
const total = Joi.number().integer();

const createOrderSchema = Joi.object({
  customer_ID: customer_ID.required(),
  date: date.required(),
  total: total.required(),
});

const updateOrderSchema = Joi.object({
  customer_ID: customer_ID,
  date: date,
  total: total
});

const getOrderSchema = Joi.object({
  id: id
});

module.exports = {
  createOrderSchema,
   updateOrderSchema,
   getOrderSchema,
};
