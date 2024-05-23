const express = require('express');
const router = express.Router();
const ProvidersService = require('../services/provider.service');
const service = new ProvidersService();

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createProviderSchema,
  getProviderSchema,
  updateProviderSchema,
} = require('../schemas/providers.schema');

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  validatorHandler(updateProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
