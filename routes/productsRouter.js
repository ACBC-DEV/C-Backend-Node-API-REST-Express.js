const express = require('express');
const ProductService = require('../services/productServices');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productScemas');
const router = express.Router();
const servicesProducts = new ProductService();

router.get('/', async (req, res) => {
  const products = await servicesProducts.find();
  res.send(products);
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await servicesProducts.findOne(id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await servicesProducts.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await servicesProducts.update(id, body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await servicesProducts.delete(id);
  res.json(rta);
});

module.exports = router;
