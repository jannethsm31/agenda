document.addEventListener('DOMContentLoaded', () => {
    const formTarea = document.getElementById('formTarea');
    const nombreTarea = document.getElementById('nombreTarea');
    const tareasContainer = document.getElementById('tareasContainer');

    // Función para crear una nueva tarea
    formTarea.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoTarea = nombreTarea.value.trim();

        if (textoTarea !== "") {
            agregarTarea(textoTarea);
            nombreTarea.value = ''; // Limpiar el campo de entrada
        }
    });

    // Función para agregar la tarea al contenedor
    function agregarTarea(texto) {
        const tareaLi = document.createElement('li');
        tareaLi.classList.add('tarea');

        const tareaTexto = document.createElement('p');
        tareaTexto.textContent = texto;

        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = 'Completar';
        botonCompletar.classList.add('completar');
        botonCompletar.addEventListener('click', () => {
            tareaTexto.classList.toggle('completada');
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', () => {
            tareasContainer.removeChild(tareaLi);
        });

        tareaLi.appendChild(tareaTexto);
        tareaLi.appendChild(botonCompletar);
        tareaLi.appendChild(botonEliminar);
        tareasContainer.appendChild(tareaLi);
    }
});
