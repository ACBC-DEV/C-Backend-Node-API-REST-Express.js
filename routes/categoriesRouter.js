const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  res.json({
    name: 'category 1',
    creationAt: '2023-09-11T19:19:03.000Z',
  });
});
router.get('/categories/:id', (req, res) => {
  res.json({
    id: req.params.id,
  });
});

module.exports = router;
