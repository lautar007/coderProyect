// app.js
const express = require('express');
const path = require('path');
//Importamos aquí mongoose para hacer la conección a la DB en mongo Atlas.
const mongoose = require('mongoose');
//Requerimientos de sockets:
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const PORT = 8080;
//Configuración de sockets:
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Array de usuarios

const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const viewsRouter = require('./routes/viewsRouter');
const userRouter = require('./routes/userRouter')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);

app.get("/", (req, res) => { res.render(__dirname + '/views/index.ejs')})
app.get("/chat", (req, res)=>{
    res.render(__dirname + '/views/chat.ejs')
})

app.use((req, res, next)=>{
    res.status(404).send(`Error 404. Lo que estas buscando no existe. Una bronca...`)
})



io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    // Se imprimirá solo la primera vez que se ha abierto la conexión:    
    console.log('Nuevo cliente conectado!!')
    //** Vamos a imprimir un mensaje de nuestro servidor al cliente:
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')
    //Para recibir el mensaje del cliente, necesitamos este código.
    //Este mensaje viene desde el archivo index.js de la carpeta public. Para poder emitir un mensaje se debe colocar como primer argumento el nombre del mensaje y como seguno la data. Para recibirlo se usa el metodo .on y se coloca como argumento el nombre del mensaje y como segundo un callback para indicar que hacer con la data que llega. En este caso se pasa por consola:  
    socket.on('notificacion', data => {
        console.log(data)
    })
    
    //Con el método io.sockets.emit puedo compartir los mensajes que llegan desde el cliente a todos los clientes conectados.
    socket.on('mensaje de inputs', data => {
        io.sockets.emit('imprimir input', data);
    })

    socket.emit('realTimeConection', 'Conectado a realTime');

    socket.on('posting', data =>{
        console.log(data);
    })
})

// El servidor funcionando en el puerto 3000
//Nótese que usamos httpServer para hacer el método .listen y NO app
httpServer.listen(PORT, () => console.log('SERVER ON IN PORT: ' + PORT))

//Aquí hacemos la conección a la DB en Mongo Atlas. El string que pasamos por argumento nos lo proporciona Mongo Atlas:
mongoose.connect('mongodb+srv://lauchita07:mandarina@coderproyect.p8ceung.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Conectado a la DB de Mongo Atlas.');
})
.catch(error =>{
    console.log('Error en la conección a la DB.');
})
