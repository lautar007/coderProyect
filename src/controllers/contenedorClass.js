const { log } = require('console');

const fs = require('fs');


class Contenedor {
    constructor(direction) {
        this.direction = direction;
    }

    async save(title, description, code, price, status, stock, category, thumbnails) {
        try {
        //Obtengo array con los objetos
          const objects = await this.getAll()
        //Obtengo Id del último objeto
          const lastId = objects.length > 0 ? objects[objects.length-1].id : 0
        //Creamos el ID al nuevo objeto en base al último.
          const newId = lastId + 1
        //Verificación de argumentos necesarios:
          if(!title || !description || !code || !price || !status || !stock || !category){
            return 'Faltan campos requeridos en el cuerpo de la petición. Asegúrese de completar title - description - code - price - status - stock - category - thumbails (opcional)'
          }

        //Verificación de código único. 
        if(objects.some((e)=> e.code === code)){
            return 'El código del producto ya existe en la base de datos. Coloque uno diferente.'
        }
        //Creamos el nuevo objeto con los parámetros recibidos
          const newObj = {
            id: newId,
            title,
            description,
            code,
            price,
            status,
            stock, 
            category,
            thumbnails
        }
        console.log(newObj)
        //Sumamos el nuevo objeto al array
          objects.push(newObj)
        //Lo guardamos en el archivo
          await this.saveObjects(objects)
        //Retornamos el nuevo ID creado
          return "Se ha guardado el siguiente producto: '" + newObj.title + "' - id: " + newObj.id         

        } catch (error) {
            return error
        }
    }

    async getById(id_obj) {
        try {
            //Obtenemos el array con los objetos
            const objects = await this.getAll()
            //Buscamos el objeto cuyo ID coincida con el ID recibido por parámetro.
            const foundById = objects.find((obj)=> obj.id === id_obj)
            return foundById || 'No existe un producto con el ID indicado'

        } catch (error) {
            throw new Error("Error al obtener objeto por Id.")
        }
    }

    getAll() {
        try {
            //Obtenemos la información del archivo pasado por parámetro al constructor
            const data = fs.readFileSync(this.direction + '/productData.json', "utf-8")
            return data ? JSON.parse(data) : []

        } catch (error) {
            return []
        }
    }

    async putById (id, title, description, code, price, status, stock, category, thumbnails){
        try{
            //Obtenemos el array con los objetos
            let objects = await this.getAll()

            
            //filtramos el producto por el id:
            const foundById = objects.find((obj)=> obj.id === id)
            
            //Verificación de código único. 
            if((objects.some((e)=> e.code === code)) && foundById.code !== code){
                return 'El código del producto ya existe en la base de datos. Coloque uno diferente.'
            }
            //Realizamos las moficiaciones si existieran:
            title ? foundById.title = title : foundById.title 
            description ? foundById.description = description : foundById.description 
            code ? foundById.code = code : foundById.code 
            price ? foundById.price = price : foundById.price 
            status ? foundById.status = status : foundById.status 
            stock ? foundById.stock = stock : foundById.stock 
            category ? foundById.category = category : foundById.category 
            thumbnails ? foundById.thumbnails = thumbnails : foundById.thumbnails 

            //Salvamos la nueva lista de productos:
            await this.saveObjects(objects)
            return 'Se ha modificado el siguiente producto: \n' + foundById.title 
        }
        catch (error){
            return error
        }
    }

    async deleteById(id_obj) {
        try {
            //Obtenemos el array con los objetos
            let objects = await this.getAll()
            //Verificamos que exista un producto con tal ID:
            const noneCode = objects.some((e)=> e.id === id_obj)
            if(!noneCode){
                return 'No existe un producto con el ID especificado.'
            }
            //Modificamos el array original eliminando el objeto indicado por parámetro.
            objects = objects.filter((obj) => obj.id !== id_obj)
            //Actualizamos el array en el archivo
            await this.saveObjects(objects)
            return 'Se ha eliminado el objeto: \n' + 'id: ' + id_obj
        } catch (error) {
            return "Error al eliminar el objeto."
        }
    }

    async deleteAll() {
        try {
            //Vaciamos el archivo.
            await this.saveObjects([])
        } catch (error) {
            throw new Error("Error al eliminar los objetos.")
        }
    }

     saveObjects(objects) {
        try {
             fs.writeFileSync(this.direction + '/productData.json', JSON.stringify(objects, null, 2))
        } catch (error) {
            return error
        }
    }


    //---------------------METODOS DE CART------------------------------------------------------

    async getAllCart() {
        try {
            //Obtenemos la información del archivo pasado por parámetro al constructor
            const data = await fs.readFile(this.direction + '/cartData.json', "utf-8")
            return data ? JSON.parse(data) : []

        } catch (error) {
            return []
        }
    }

    async postCart(){
        try{
            //Obtengo array con los carritos
          const carts = await this.getAllCart()
        //Obtengo Id del último objeto
          const lastId = carts.length > 0 ? carts[carts.length-1].id : 0
        //Creamos el ID al nuevo objeto en base al último.
          const newId = lastId + 1
        //Configuro la estructura del nuevo carrito
            const newCart = {
                id: newId,
                products: []
            }
            carts.push(newCart);
            await fs.writeFile(this.direction + '/cartData.json', JSON.stringify(carts, null, 2))
            return 'Se ha agregado con éxito el carrito con el ID numero: ' + newId
        }catch(error){
            return error
        }
    }

    async postProductToCart(cid, pid){
        try {
            //Valido si existe el carrito o el producto:
            let products = await this.getAll();
            let carts = await this.getAllCart();
            let verifProduct = products.some((e)=> e.id === pid);
            let verifCart = carts.some((e)=> e.id === cid);
            if(!verifProduct || !verifCart){
                return 'El producto o el carrito con el ID indicado no existe. Pruebe con otros valores.'
            }
            //traigo el carrito en cuestión: 
            let cart = carts.find((e)=> e.id === cid);
            //Si el carrito ya tiene el producto, le sumo la propiedad quantity:
            if(cart.products.some((e)=> e.id === pid)){
                let product = cart.products.find((e)=> e.id === pid)
                product.quantity ++
                await fs.writeFile(this.direction + '/cartData.json', JSON.stringify(carts, null, 2))
                return 'El carrito sumó una unidad más del producto con el ID: ' + pid;
            } else{
                //Si no, lo agrego:
                cart.products.push({
                    id: pid,
                    quantity: 1
                })
                await fs.writeFile(this.direction + '/cartData.json', JSON.stringify(carts, null, 2))
                return 'El carrito sumó a la lista el producto con el ID: ' + pid;
            }
        
        } catch (error) {
            console.log('Hubo un error');
            return error
        }
    }

    async productsCartById(id){
        try {
            let carts = await this.getAllCart();
            let cart = carts.find((e)=> e.id === id);
            if(!cart){
                return 'No existe ningún carrito con el ID especificado.'
            } else return cart.products
        } catch (error){
            return error
        }
    }

} 

module.exports = Contenedor;