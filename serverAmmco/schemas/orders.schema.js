const Joi = require('joi');

const id = Joi.number().integer()
const customer_ID = Joi.number().integer();
const date = Joi.date();
const total = Joi.number().integer();
const alineacion = Joi.number().integer();
const balanceo = Joi.number().integer();
const pivotes = Joi.number().integer();

const createOrderSchema = Joi.object({
  customer_ID: customer_ID.required(),
  date: date.required(),
  alineacion: alineacion.required(),
  balanceo: balanceo.required(),
  pivotes: pivotes.required(),
  total: total.required(),
});

const updateOrderSchema = Joi.object({
  customer_ID: customer_ID,
  date: date,
  alineacion: alineacion,
  balanceo: balanceo,
  pivotes: pivotes,
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
