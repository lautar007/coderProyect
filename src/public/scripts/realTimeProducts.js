const lista = document.getElementsByClassName('listaActualizada')[0];
const form = document.getElementsByClassName('formulario')[0];
console.log('HOLAAAAAA');

const botonesEliminar = document.querySelectorAll('.eliminarBtn');

botonesEliminar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const url = '/api/products/' + e.target.value;
        const requestOptions = {
            method: 'DELETE'
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    alert('Recurso eliminado con éxito');
                    window.location.reload();
                } else {
                    alert('Error al eliminar el recurso');
                }
            })
            .catch(error => {
                alert('Error en la solicitud DELETE:', error);
            });
    });
});



form.addEventListener('submit', (e)=>{ 
    console.log('SE HIZO EL SUBMIT');
    socket.emit('posting', 'El servidor captó un nuevo POST'); 
})

const socket = io();
socket.on('realTimeConection', data=>{
    console.log('Conectado a io');
})