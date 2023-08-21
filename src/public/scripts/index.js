const input = document.getElementsByClassName('inputText');
const results = document.getElementsByClassName('resultsP');
console.log(results[0]);

input[0].addEventListener("input", function(e) {
    var textoIngresado = e.target.value;
    socket.emit('mensaje de inputs', textoIngresado)
});

//Aquí vamos a otra conección a socket. Este archivo va linkeado al html mediante una etiqueta <script>
const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

//Aquí le estamos enviando le mensaje al cliente. Este mensaje se definió en el archivo app.js **
socket.on('mi mensaje', data => {
    alert(data);
    //Así como podemos enviar un mensaje al cliente, el cliente de la misma forma puede retornar un mensaje de confirmación:
    socket.emit('notificacion', 'Mensaje recibido exitosamente')
    //Este tipo de mensajería nos permite verificar el funcionamiento de la correcta conección entre servidor y cliente. Ahora emitimos otro mensaje para que se comparta a todos los clientes conectados:
    //socket.emit('mensaje', 'Hola a todos, soy nuevo en esto!!')
})

socket.on('imprimir input', data => {
    results[0].textContent = data
})