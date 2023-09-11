const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');

router.get('/home', viewsController.productList);
router.get('/realTimeProducts', viewsController.realTimeProductList);
router.get('/userForm', userController.form);
router.get('/userList', viewsController.userList);

module.exports = router;