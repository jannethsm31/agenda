document.addEventListener('DOMContentLoaded', () => {
    const formReunion = document.getElementById('formReunion');
    const nombreReunion = document.getElementById('nombreReunion');
    const fechaReunion = document.getElementById('fechaReunion');
    const horaReunion = document.getElementById('horaReunion');
    const reunionesContainer = document.getElementById('reunionesContainer');

    //Funcion para cargar las reuniones guardadas en el LocalStoragelet reuniones = JSON.parse(localStorage.getItem('reuniones')) || [];
    let reuniones = JSON.parse(localStorage.getItem('reuniones')) || [];

    //Renderizar las reuniones iniciales
    reuniones.forEach(reunion => agregarReunion(reunion.texto, reunion.fecha, reunion.hora));

    // Función para agregar una nueva reunión
    formReunion.addEventListener('submit', (e) => {
        e.preventDefault();
        const textoReunion = nombreReunion.value.trim();
        const fecha = fechaReunion.value;
        const hora = horaReunion.value;

        if (textoReunion && fecha && hora) {
            agregarReunion(textoReunion, fecha, hora);
            reuniones.push({ texto: textoReunion, fecha: fecha, hora: hora });//Agrega la reunion al array
            guardarEnLocalStorage();//Guarda las reuniones en el localstorage
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
            eliminarReunion(texto, fecha, hora); //Eliminar reunion del localstorage
        });

        reunionLi.appendChild(reunionInfo);
        reunionLi.appendChild(botonEliminar);
        reunionesContainer.appendChild(reunionLi);
    }

    // Función para guardar las reuniones en el LocalStorage
    function guardarEnLocalStorage() {
        localStorage.setItem('reuniones', JSON.stringify(reuniones));
    }

    // Función para eliminar una reunión del LocalStorage
    function eliminarReunion(texto, fecha, hora) {
        reuniones = reuniones.filter(reunion => reunion.texto !== texto && reunion.fecha !== fecha && reunion.hora !== hora);
        guardarEnLocalStorage();//Actualizar el LocalStorage
    }
});
