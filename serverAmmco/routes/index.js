const proyectosRouter = require('./proyectos.router');
const clientesRouter = require('./clientes.router');
const trabajadoresRouter = require('./trabajadores.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const payrollsRouter = require('./payrolls.router');
const NominasSemanalesRouter = require('./NominasSemanales.router');
const CalculosHugoRouter = require('./CalculosHugo.router');
const AdjustmentsRouter = require('./Adjustments.router');

const CustomerRouter = require('./Customers.router');
const OrderRouter = require('./Order.router');
const OrderDetailRouter = require('./orderDetail.router');

function routerApi(app) {
  app.use('/Api/v1/customers', CustomerRouter);
  app.use('/Api/v1/orders', OrderRouter);
  app.use('/Api/v1/orderDetails', OrderDetailRouter);

  app.use('/Api/v1/proyectos', proyectosRouter),
    app.use('/Api/v1/clientes', clientesRouter),
    app.use('/Api/v1/trabajadores', trabajadoresRouter),
    app.use('/Api/v1/users', usersRouter),
    app.use('/Api/v1/payrolls', payrollsRouter),
    app.use('/Api/v1/nominasSemanales', NominasSemanalesRouter),
    app.use('/Api/v1/auth', authRouter);
  app.use('/Api/v1/CalculosHugo', CalculosHugoRouter);
  app.use('/Api/v1/ajustes', AdjustmentsRouter);
}

module.exports = routerApi;
