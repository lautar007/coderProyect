const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

//Ruta para postear un nuevo carrito:
router.post('/', cartController.postCart);
//Ruta para obtener la lista de productos que contiene un carrito: 
router.get('/:cid', cartController.getById);
//Ruta para cumar un nuevo producto a un carrito:
router.post('/:cid/product/:pid', cartController.postProductToCart);

module.exports = router;
