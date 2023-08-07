const Contenedor = require('./contenedorClass');
const direction = require('../../data/direction')
const conteiner = new Contenedor(direction);

const productController = {
    list: (req, res) =>{
        console.log(req.query)
        const limit = req.query.limit
        if(limit){
            res.send('Aquí se muestra hasta un límite de ' + limit + ' productos.')
        }
        res.send('Aquí se muestra la lista de productos')
    },

    byID: (req, res) =>{
        const id = parseInt(req.params.id);
        console.log(id);
        res.send('Aquí se muestra el producto con el ID: ' + id)
    },

    post: async(req, res)=> {
        const {title, description, code, price, status, stock, category, thumbnails} = req.body
        const saveProduct = await conteiner.save(title, description, code, price, status, stock, category, thumbnails)
        res.send(saveProduct)
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