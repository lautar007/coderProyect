const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Para mostrar la lista de productos, toda o con un límite de cantidad:
router.get('/', productController.list);
//Para mostrar un producto por ID:
router.get('/:id', productController.byID);
//Para agregar un nuevo producto:
router.post('/', productController.post)

module.exports = router;