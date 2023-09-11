const botonesEliminar = document.querySelectorAll('.eliminarBtn');

botonesEliminar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const url = '/api/users/' + e.target.value;
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