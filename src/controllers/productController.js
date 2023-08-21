const Contenedor = require('./contenedorClass');
const direction = require('../../data/direction')
const conteiner = new Contenedor(direction);

const productController = {
    list: async (req, res) =>{
        const products = await conteiner.getAll()
        const {limit} = req.query
        let limitList = products.slice(0, limit)
        if(limit){
            res.send(limitList)
        } else{
            res.send(products) 
        }
    },

    byID: async(req, res) =>{
        const id = parseInt(req.params.id);
        let product = await conteiner.getById(id)
        res.send(product);
    },

    post: async(req, res)=> {
        let {title, description, code, price, status, stock, category, thumbnail} = req.body
        !status? status = true : status;
        thumbnail ? thumbnail = [thumbnail] : thumbnail;
        const saveProduct = await conteiner.save(title, description, code, price, status, stock, category, thumbnail)
        console.log(saveProduct);
        if(typeof saveProduct === 'string' && saveProduct[0] !== 'S'){
            res.status(200).send(saveProduct);
        }
        res.status(200).redirect('/realTimeProducts');
    },

    put: async(req, res) =>{
        const {id, title, description, code, price, status, stock, category, thumbnails} = req.body
        console.log(req.body);
        const putProduct = await conteiner.putById(id, title, description, code, price, status, stock, category, thumbnails)
        res.send(putProduct)
    },

    deleteById: async(req, res) => {
        const {id} = req.params;
        const deleteProduct = await conteiner.deleteById(parseInt(id));
        res.send(deleteProduct);
    }

}

module.exports = productController