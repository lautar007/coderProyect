const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Para mostrar la lista de productos, toda o con un límite de cantidad:
router.get('/', productController.list);
//Para mostrar un producto por ID:
router.get('/:id', productController.byID);
//Para agregar un nuevo producto:
router.post('/', productController.post);
//Para modificar los valores de un producto:
router.put('/', productController.put);
//Para eliminar un producto por ID:
router.delete('/:id', productController.deleteById)

module.exports = router;