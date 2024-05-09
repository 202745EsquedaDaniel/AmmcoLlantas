'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require("../models/customers.model")
const {OrderSchema, ORDER_TABLE} = require("../models/orders.model");
const {OrderDetailSchema, ORDERDETAILS_TABLE} = require("../models/orderDetails.model")
const {UserSchema, USER_TABLE} = require("../models/users.model")
const {TireSchema, TIRES_TABLE} = require("../models/tires.model")
const {ProviderSchema, PROVIDER_TABLE} = require("../models/providers.model")


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PROVIDER_TABLE, ProviderSchema);
    await queryInterface.createTable(TIRES_TABLE, TireSchema);
    await queryInterface.createTable(ORDERDETAILS_TABLE, OrderDetailSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDERDETAILS_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(TIRES_TABLE);
    await queryInterface.dropTable(PROVIDER_TABLE);
  }
};
