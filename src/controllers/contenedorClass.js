const fs = require('fs').promises


class Contenedor {
    constructor(direction) {
        this.direction = direction;
    }

    async save(title, description, code, price, status, stock, category, thumbnails) {
        try {
        //Obtengo array con los objetos
          const objects = await this.getAll()
          console.log(objects)
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
        //Sumamos el nuevo objeto al array
          objects.push(newObj)
          console.log(objects);
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
            return foundById || null

        } catch (error) {
            throw new Error("Error al obtener objeto por Id.")
        }
    }

    async getAll() {
        try {
            //Obtenemos la información del archivo pasado por parámetro al constructor
            const data = await fs.readFile(this.direction + '/productData.json', "utf-8")
            return data ? JSON.parse(data) : []

        } catch (error) {
            return []
        }
    }

    async deleteById(id_obj) {
        try {
            //Obtenemos el array con los objetos
            let objects = await this.getAll()
            //Modificamos el array original eliminando el objeto indicado por parámetro.
            objects = objects.filter((obj) => obj.id !== id_obj)
            //Actualizamos el array en el archivo
            await this.saveObjects(objects)

        } catch (error) {
            throw new Error("Error al eliminar el objeto.", error)
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

    async saveObjects(objects) {
        try {
            await fs.writeFile(this.direction + '/productData.json', JSON.stringify(objects, null, 2))
        } catch (error) {
            return error
        }
    }

} 

module.exports = Contenedor;