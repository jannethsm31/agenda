document.addEventListener('DOMContentLoaded', () => {
    const formObjetivo = document.getElementById('formObjetivo');
    const nombreObjetivo = document.getElementById('nombreObjetivo');
    const prioridadObjetivo = document.getElementById('prioridadObjetivo');
    const objetivosContainer = document.getElementById('objetivosContainer');

    // Función para agregar un nuevo objetivo
    formObjetivo.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoObjetivo = nombreObjetivo.value.trim();
        const prioridad = prioridadObjetivo.value;

        if (textoObjetivo && prioridad) {
            agregarObjetivo(textoObjetivo, prioridad);
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
        });

        objetivoLi.appendChild(objetivoInfo);
        objetivoLi.appendChild(botonEliminar);
        objetivosContainer.appendChild(objetivoLi);
    }
});
