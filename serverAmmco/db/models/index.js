const { Tire, TireSchema } = require('./tires.model');
const { Provider, ProviderSchema } = require('./providers.model');
const { Order, OrderSchema } = require('./orders.model');
const { Customer, CustomerSchema } = require('./customers.model');
const { User, UserSchema } = require('./users.model');
const { OrderDetail, OrderDetailSchema} = require("./orderDetails.model")



function setupModels(sequelize) {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Provider.init(ProviderSchema, Provider.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Tire.init(TireSchema, Tire.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  OrderDetail.init(OrderDetailSchema, OrderDetail.config(sequelize));


  Order.associate(sequelize.models);
  OrderDetail.associate(sequelize.models);
  Tire.associate(sequelize.models);
  Provider.associate(sequelize.models);
}

module.exports = setupModels;
