document.addEventListener('DOMContentLoaded', () => {
    const formReunion = document.getElementById('formReunion');
    const nombreReunion = document.getElementById('nombreReunion');
    const fechaReunion = document.getElementById('fechaReunion');
    const horaReunion = document.getElementById('horaReunion');
    const reunionesContainer = document.getElementById('reunionesContainer');

    // Función para agregar una nueva reunión
    formReunion.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoReunion = nombreReunion.value.trim();
        const fecha = fechaReunion.value;
        const hora = horaReunion.value;

        if (textoReunion && fecha && hora) {
            agregarReunion(textoReunion, fecha, hora);
            // Limpiar los campos del formulario
            nombreReunion.value = '';
            fechaReunion.value = '';
            horaReunion.value = '';
        }
    });

    // Función para agregar la reunión al contenedor
    function agregarReunion(texto, fecha, hora) {
        const reunionLi = document.createElement('li');
        reunionLi.classList.add('reunion');

        const reunionInfo = document.createElement('p');
        reunionInfo.textContent = `${texto} - Fecha: ${fecha}, Hora: ${hora}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', () => {
            reunionesContainer.removeChild(reunionLi);
        });

        reunionLi.appendChild(reunionInfo);
        reunionLi.appendChild(botonEliminar);
        reunionesContainer.appendChild(reunionLi);
    }
});
