import { guardarEnLocalStorage } from './utils/guardarLocalStorage.js'

document.addEventListener('DOMContentLoaded', () => {
    const formTarea = document.getElementById('formTarea');
    const nombreTarea = document.getElementById('nombreTarea');
    const tareasContainer = document.getElementById('tareasContainer');

    //Cargar las tareas guardadas en el LocalStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    //Renderizar las tareas iniciales
    tareas.forEach(tarea => agregarTarea(tarea.texto, tarea.completada));

    // Función para crear una nueva tarea
    formTarea.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoTarea = nombreTarea.value.trim();

        if (textoTarea !== "") {
            agregarTarea(textoTarea, false);
            tareas.push({ texto: textoTarea, completada: false });//Agregar la tarea al array
            guardarEnLocalStorage('tareas', tareas);//Guardar las tareas en el LocalStorage
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
            actualizarCompletada(texto);//Actualizar el estado de la tarea en el localStorage
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', () => {
            tareasContainer.removeChild(tareaLi);
            eliminarTarea(texto);//Eliminar la tarea del localStorage
        });

        tareaLi.appendChild(tareaTexto);
        tareaLi.appendChild(botonCompletar);
        tareaLi.appendChild(botonEliminar);
        tareasContainer.appendChild(tareaLi);
    }

    // Función para actualizar el estado de la tarea
    function actualizarCompletada(texto) {
        tareas = tareas.map(tarea => {
            if (tarea.texto === texto) {
                tarea.completada = !tarea.completada;
            }
            return tarea;
        });
        guardarEnLocalStorage('tareas', tareas);//Actualizar el localStorage
    }

    // Función para eliminar una tarea
    function eliminarTarea(texto) {
        tareas = tareas.filter(tarea => tarea.texto !== texto);
        guardarEnLocalStorage('tareas', tareas);//Actualizar el localStorage
    }
});
