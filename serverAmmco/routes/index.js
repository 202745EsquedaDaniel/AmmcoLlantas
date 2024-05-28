
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const CustomerRouter = require('./Customers.router');
const OrderRouter = require('./Order.router');
const OrderDetailRouter = require('./orderDetail.router');
const ProvidersRouter = require('./provider.router');
const TireRouter = require('./tire.provider');

function routerApi(app) {
  app.use('/Api/v1/customers', CustomerRouter);
  app.use('/Api/v1/orders', OrderRouter);
  app.use('/Api/v1/orderDetails', OrderDetailRouter);
  app.use('/Api/v1/providers', ProvidersRouter);
  app.use('/Api/v1/tires', TireRouter);
  app.use('/Api/v1/users', usersRouter),
  app.use('/Api/v1/auth', authRouter);


}

module.exports = routerApi;
