const Contenedor = require('./contenedorClass');
const direction = require('../../data/direction')
const conteiner = new Contenedor(direction);

const viewsController = {
    productList: async(req, res)=>{
        const list = await conteiner.getAll();
        res.render('home', {list})
    },
    realTimeProductList: async(req, res) =>{
        const list = await conteiner.getAll();
        res.render('realTimeProducts', {list})
    }
}

module.exports = viewsController;