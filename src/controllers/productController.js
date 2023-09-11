const Contenedor = require('./contenedorClass');
const direction = require('../../data/direction')
const conteiner = new Contenedor(direction);
const productModel = require('../models/products.model');
//Las funciones siempre deben ser asíncronas al trabajar con mongoose.

const productController = {
    list: async (req, res) =>{
       
            console.log('Estoy por hacer el get');
            const products =  await productModel.find();
            //Esto es para colocarle un límite a los resultados. Descomentar luego y hacer un condicional.
            // const {limit} = req.query
            // let limitList = products.slice(0, limit)
           res.send({result: 'succes', payload: products});
    },

    byID: async(req, res) =>{
        const id = req.params.id;
        let product = await productModel.findById(id)
        res.send({result: 'succes', payload: product}); 
    },

    post: async(req, res)=> {
        let {title, price, stock, category, image} = req.body
        if(!title || !price || !stock || !category){
            res.send({status: 'Error', error: "Falta rellenar capos"})
        }

        let result = await productModel.create({title, price, stock, category, image})

        res.send({result:'succes', payload: result});
    },

    put: async(req, res) =>{
        const {id, title, price, stock, category, image} = req.body;
        if(!id || !title || !price || !stock || !category){
            res.send({status: 'Error', error: "Falta rellenar capos"});
        };
        try {
            const putProduct = await productModel.findByIdAndUpdate(id, {title, price, stock, category, image});
            res.send({result: 'succes, product updated', payload: putProduct});
        } catch (error) {
            res.send({result: 'Error', payload: error});
        };
    },

    deleteById: async(req, res) => {
        const {id} = req.params;
        const deleteProduct = await productModel.findByIdAndDelete(id);
        res.send({result: "succes, product deleted", payload: deleteProduct});
    }

}

module.exports = productController