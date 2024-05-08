const Joi = require('joi');

const id = Joi.number().integer();
const order_ID = Joi.number().integer();
const tire_ID = Joi.number().integer();
const quantity = Joi.number().integer();
const unitPrice = Joi.number().integer();

const createOrderDetailSchema = Joi.object({
  order_ID: order_ID.required(),
  tire_ID: tire_ID.required(),
  quantity: quantity.required(),
  unitPrice: unitPrice.required(),
});

const updateOrderDetailSchema = Joi.object({
  order_ID: order_ID,
  tire_ID: tire_ID,
  quantity: quantity,
  unitPrice: unitPrice,
});

const getOrderDetailSchema = Joi.object({
  id: id,
});

module.exports = {
  createOrderDetailSchema,
  updateOrderDetailSchema,
  getOrderDetailSchema,
};
