const Contenedor = require('./contenedorClass');
const direction = require('../../data/direction')
const conteiner = new Contenedor(direction);

const cartController = {
    postCart: async(req, res) =>{
        let newCart = await conteiner.postCart();
        res.send(newCart);
    },
    getById: async(req, res)=>{
        let {cid} = req.params;
        let products = await conteiner.productsCartById(parseInt(cid));
        res.send(products)
    },
    postProductToCart: async (req, res)=>{
        let {cid, pid} = req.params;
        let productToCart = await conteiner.postProductToCart(parseInt(cid), parseInt(pid));
        res.send(productToCart);
    }
} 

module.exports = cartController; 