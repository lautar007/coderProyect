const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController')

router.get('/home', viewsController.productList);
router.get('/realTimeProducts', viewsController.realTimeProductList);

module.exports = router;