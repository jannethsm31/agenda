document.addEventListener('DOMContentLoaded', () => {
    const formNota = document.getElementById('formNota');
    const contenidoNota = document.getElementById('contenidoNota');
    const notasContainer = document.getElementById('notasContainer');

    //Cargar las notas guardadas en el LocalStorage
    let notas = JSON.parse(localStorage.getItem('notas')) || [];

    //Renderizar las notas iniciales
    notas.forEach(nota => agregarNota(nota));

    // Función para crear una nueva nota
    formNota.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoNota = contenidoNota.value.trim();

        if (textoNota !== "") {
            agregarNota(textoNota);
            notas.push(textoNota);//Agrega las notas al array
            guardarEnLocalStorage();//Guardar notas en el localstorage
            contenidoNota.value = ''; // Limpiar textarea
        }
    });

    // Función para agregar la nota al contenedor
    function agregarNota(texto) {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');

        const pNota = document.createElement('p');
        pNota.textContent = texto;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.addEventListener('click', () => {
            notasContainer.removeChild(notaDiv);
            eliminarNota(texto);//Eliminar nota del localstorage
        });

        notaDiv.appendChild(pNota);
        notaDiv.appendChild(botonEliminar);
        notasContainer.appendChild(notaDiv);
    }

    // Función para guardar las notas en el LocalStorage
    function guardarEnLocalStorage() {
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    // Función para eliminar una nota
    function eliminarNota(texto) {
        notas = notas.filter(nota => nota !== texto);
        guardarEnLocalStorage();//Actualiza el localstorage
    }
});
