const express = require('express');
const UserServices = require('../services/userServices');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/userScemas');

const userServices = new UserServices();
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await userServices.find();
  res.send(users);
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userServices.findOne(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
);
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await userServices.create(body);
    res.status(201).json(newUser);
  },
);
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userServices.update(id, body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
);
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await userServices.delete(id);
  res.json(rta);
});

module.exports = router;
