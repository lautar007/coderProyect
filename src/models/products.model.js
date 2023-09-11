//Primero importamos mongoose: 
const mongoose = require('mongoose');

//Definimos como se llamará nuestra colección en la DB:
const productsCollection = 'Products';

//Definimos el esquema, es decir, una constante que será una nueva instancia de la clase Schema de mongoose.
//Recibe como argumento un objeto donde definiremos todas las propiedades de nuestro esquema:
const productsSchema = new mongoose.Schema({
    category: String, //<---Si solo necesitamos especificar el tipo de dato, lo hacemos directamente.
    title: { //Si queremos setear varias constrains para nuestro dato, configuramos un objeto.
        type: String,
        required: true
    },
    price: Number,
    stock: Number,
    image: String
});

//Para finalizar se debe exportar el modelo. El modelo en sí es otro método de mongoose que lleva por argumento el nombre de la colección ('productsCollection') y el schema ('productsSchema'):

const productsModel = mongoose.model(productsCollection, productsSchema);
module.exports = productsModel;

//Eso sería todo. Ahora debemos importar este modelo en el router de productos.