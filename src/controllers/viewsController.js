const Contenedor = require('./contenedorClass');
const direction = require('../../data/direction')
const conteiner = new Contenedor(direction);
const productModel = require('../models/products.model');
const usersModel = require('../models/users.model');

const viewsController = {
    productList: async(req, res)=>{
        const list = await productModel.find();
        res.render('home', {list})
    },
    realTimeProductList: async(req, res) =>{
        const list = await productModel.find();
        res.render('realTimeProducts', {list})
    },
    userList: async (req, res)=>{
        const list = await usersModel.find();
        res.render('userList', {list});
    }
}

module.exports = viewsController;