const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// define router for products
router.get('/', productsController.index);

router.get('/:id', productsController.show);

router.post('/', productsController.create);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.destroy);

//export the router
module.exports = router;