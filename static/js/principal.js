import { obtenerLocalStorage } from "./utils/obtenerLocalStorage.js";
import { agregarDatos } from "./utils/agregarElementos.js";

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los valores del localStorage
    const notas = obtenerLocalStorage('notas') || [];
    const actividades = obtenerLocalStorage('actividades') || [];
    const contactos = obtenerLocalStorage('contactos') || [];
    const reuniones = obtenerLocalStorage('reuniones') || [];
    const tareas = obtenerLocalStorage('tareas') || [];
    const objetivos = obtenerLocalStorage('objetivos') || [];

    // Agregar datos a los respectivos divs
    agregarDatos(actividades, 'actividades');
    agregarDatos(notas, 'notas');
    agregarDatos(contactos, 'contactos');
    agregarDatos(reuniones, 'reuniones');
    agregarDatos(tareas, 'tareas');
    agregarDatos(objetivos, 'objetivos');
});
