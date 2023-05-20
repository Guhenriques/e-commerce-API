const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// define router for users
router.get('/', usersController.index);
router.get('/:id', usersController.show);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

//export the router
module.exports = router;


