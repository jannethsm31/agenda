import { guardarEnLocalStorage } from "./utils/guardarLocalStorage.js";

document.addEventListener('DOMContentLoaded', () => {
    const nombresDiasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let fechaActual = new Date();
    //Recuperar actividades guardadas en localStorage
    let actividadesPorDia = JSON.parse(localStorage.getItem('actividadesPorDia')) || {};

    const tabla = document.getElementById('tablaCalendario');
    const tbody = tabla.querySelector('tbody');
    const thead = tabla.querySelector('thead tr');
    const mesAnio = document.getElementById('mesAnio');
    const fechaSeleccionadaElem = document.getElementById('fechaSeleccionada');
    const listaActividades = document.getElementById('listaActividades');
    const nuevaActividadInput = document.getElementById('nuevaActividad');
    const btnAgregarActividad = document.getElementById('agregarActividad');
    const mensajeFelicidades = document.createElement('div'); // Contenedor para el mensaje de felicitaciones

    // Botones para cambiar de mes
    const btnPrev = document.getElementById('prevMes');
    const btnNext = document.getElementById('nextMes');

    btnPrev.addEventListener('click', () => cambiarMes(-1));
    btnNext.addEventListener('click', () => cambiarMes(1));

    let diaSeleccionado = null;

    // Función para renderizar el calendario
    function renderizarCalendario(fecha) {
        const mes = fecha.getMonth();
        const año = fecha.getFullYear();
        const primerDiaMes = new Date(año, mes, 1).getDay();
        const diasEnMes = new Date(año, mes + 1, 0).getDate();

        mesAnio.textContent = `${meses[mes]} ${año}`;

        // Limpiar tabla
        tbody.innerHTML = '';
        thead.innerHTML = '';

        // Añadir nombres de días
        for (let dia of nombresDiasSemana) {
            const th = document.createElement('th');
            th.textContent = dia;
            thead.appendChild(th);
        }

        // Añadir días del mes
        let fila = document.createElement('tr');
        for (let i = 0; i < primerDiaMes; i++) {
            fila.appendChild(document.createElement('td'));
        }

        for (let dia = 1; dia <= diasEnMes; dia++) {
            const celda = document.createElement('td');
            celda.textContent = dia;
            celda.classList.add('dia');
            celda.addEventListener('click', () => seleccionarDia(dia, mes, año));
            fila.appendChild(celda);

            if ((dia + primerDiaMes) % 7 === 0) {
                tbody.appendChild(fila);
                fila = document.createElement('tr');
            }
        }

        tbody.appendChild(fila);
    }

    // Cambiar mes
    function cambiarMes(movimiento) {
        fechaActual.setMonth(fechaActual.getMonth() + movimiento);
        renderizarCalendario(fechaActual);
    }

    // Seleccionar día
    function seleccionarDia(dia, mes, año) {
        diaSeleccionado = `${dia}-${mes}-${año}`;
        fechaSeleccionadaElem.textContent = `${dia} de ${meses[mes]} de ${año}`;
        renderizarActividades();
    }

    // Agregar actividad
    btnAgregarActividad.addEventListener('click', () => {
        if (!diaSeleccionado) return alert('Por favor selecciona un día.');
        const actividad = nuevaActividadInput.value.trim();
        if (!actividad) return alert('Por favor escribe una actividad.');

        if (!actividadesPorDia[diaSeleccionado]) {
            actividadesPorDia[diaSeleccionado] = [];
        }

        actividadesPorDia[diaSeleccionado].push({ texto: actividad, completada: false });
        guardarEnLocalStorage('actividadesPorDia', actividadesPorDia); // Guardar actividades en localStorage
        nuevaActividadInput.value = '';
        renderizarActividades();
    });

    // Renderizar actividades del día seleccionado
    function renderizarActividades() {
        listaActividades.innerHTML = '';
        mensajeFelicidades.textContent = ''; // Limpiar el mensaje de felicitaciones
        const actividades = actividadesPorDia[diaSeleccionado] || [];

        actividades.forEach((actividad, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = actividad.completada;
            checkbox.addEventListener('change', () => marcarCompletada(index));

            const span = document.createElement('span');
            span.textContent = actividad.texto;
            if (actividad.completada) {
                span.style.textDecoration = 'line-through';
            }

            li.appendChild(checkbox);
            li.appendChild(span);
            listaActividades.appendChild(li);
        });

        verificarCompletadas(); // Verificar si todas las actividades están completadas
    }

    // Marcar una actividad como completada
    function marcarCompletada(index) {
        actividadesPorDia[diaSeleccionado][index].completada = !actividadesPorDia[diaSeleccionado][index].completada;
        guardarEnLocalStorage('actividadesPorDia', actividadesPorDia); // Guardar actividades en localStorage
        renderizarActividades();
    }

    // Verificar si todas las actividades están completadas
    function verificarCompletadas() {
        const actividades = actividadesPorDia[diaSeleccionado] || [];
        const todasCompletadas = actividades.length > 0 && actividades.every(actividad => actividad.completada);

        if (todasCompletadas) {
            mensajeFelicidades.textContent = '¡FELICIDADES, CUMPLISTE CON TODAS LAS ACTIVIDADES!';
            mensajeFelicidades.style.color = 'green';
            mensajeFelicidades.style.fontWeight = 'bold';
            listaActividades.appendChild(mensajeFelicidades); // Mostrar el mensaje en la lista de actividades
        }
    }

    // // Funcion para guardar actividades en localStorage
    // function guaedarEnLocalStorage() {
    //     localStorage.setItem('actividadesPorDia', JSON.stringify(actividadesPorDia));
    // }

    // Render inicial
    renderizarCalendario(fechaActual);
});
