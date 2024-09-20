document.addEventListener('DOMContentLoaded', () => {
    const formObjetivo = document.getElementById('formObjetivo');
    const nombreObjetivo = document.getElementById('nombreObjetivo');
    const prioridadObjetivo = document.getElementById('prioridadObjetivo');
    const objetivosContainer = document.getElementById('objetivosContainer');

    //Caragar los objetivos desde el localstorage
    let objetivos = JSON.parse(localStorage.getItem('objetivos')) || [];

    //Renderizar los objetivos iniciales
    objetivos.forEach(objetivo => agregarObjetivo(objetivo.texto, objetivo.prioridad));

    // Función para agregar un nuevo objetivo
    formObjetivo.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoObjetivo = nombreObjetivo.value.trim();
        const prioridad = prioridadObjetivo.value;

        if (textoObjetivo && prioridad) {
            agregarObjetivo(textoObjetivo, prioridad);
            objetivos.push({ texto: textoObjetivo, prioridad: prioridad });//Agrega el objetivo al array
            guardarEnLocalStorage();//Guarda los objetivos en el localstorage
            // Limpiar los campos del formulario
            nombreObjetivo.value = '';
            prioridadObjetivo.value = 'Alta';
        }
    });

    // Función para agregar el objetivo al contenedor
    function agregarObjetivo(texto, prioridad) {
        const objetivoLi = document.createElement('li');
        objetivoLi.classList.add('objetivo');

        // Asignar una clase según la prioridad
        switch (prioridad) {
            case 'Alta':
                objetivoLi.classList.add('alta');
                break;
            case 'Media':
                objetivoLi.classList.add('media');
                break;
            case 'Baja':
                objetivoLi.classList.add('baja');
                break;
        }

        const objetivoInfo = document.createElement('p');
        objetivoInfo.textContent = `${texto} (Prioridad: ${prioridad})`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', () => {
            objetivosContainer.removeChild(objetivoLi);
            eliminarObjetivo(texto); //Eliminar objetivo del localstorage
        });

        objetivoLi.appendChild(objetivoInfo);
        objetivoLi.appendChild(botonEliminar);
        objetivosContainer.appendChild(objetivoLi);
    }

    //Funcion para guardar los objetivos en el localstorage
    function guardarEnLocalStorage() {
        localStorage.setItem('objetivos', JSON.stringify(objetivos));
    }

    //Funcion para eliminar un objetivo
    function eliminarObjetivo(texto) {
        objetivos = objetivos.filter(objetivo => objetivo.texto !== texto);
        guardarEnLocalStorage();//Actualiza el localstorage
    }
});
