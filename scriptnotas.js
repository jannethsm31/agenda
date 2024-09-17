document.addEventListener('DOMContentLoaded', () => {
    const formNota = document.getElementById('formNota');
    const contenidoNota = document.getElementById('contenidoNota');
    const notasContainer = document.getElementById('notasContainer');

    // Función para crear una nueva nota
    formNota.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoNota = contenidoNota.value.trim();

        if (textoNota !== "") {
            agregarNota(textoNota);
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
        });

        notaDiv.appendChild(pNota);
        notaDiv.appendChild(botonEliminar);
        notasContainer.appendChild(notaDiv);
    }
});
