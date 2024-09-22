import { guardarEnLocalStorage } from "./utils/guardarLocalStorage.js";

document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.getElementById('formContacto');
    const nombreContacto = document.getElementById('nombreContacto');
    const telefonoContacto = document.getElementById('telefonoContacto');
    const emailContacto = document.getElementById('emailContacto');
    const contactosContainer = document.getElementById('contactosContainer');

    //Cargar los contactos guardados en el LocalStorage
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

    //Renderiza los contactos iniciales
    contactos.forEach(contacto => agregarContacto(contacto.nombre, contacto.telefono, contacto.email));

    // Función para agregar un nuevo contacto
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = nombreContacto.value.trim();
        const telefono = telefonoContacto.value.trim();
        const email = emailContacto.value.trim();

        if (nombre && telefono && email) {
            agregarContacto(nombre, telefono, email);
            contactos.push({ nombre, telefono, email });
            guardarEnLocalStorage('contactos', contactos);//Guardar contactos en el localstorage
            // Limpiar los campos del formulario
            nombreContacto.value = '';
            telefonoContacto.value = '';
            emailContacto.value = '';
        }
    });

    // Función para agregar el contacto al contenedor
    function agregarContacto(nombre, telefono, email) {
        const contactoLi = document.createElement('li');
        contactoLi.classList.add('contacto');

        const contactoInfo = document.createElement('p');
        contactoInfo.textContent = `${nombre} - ${telefono} - ${email}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', () => {
            contactosContainer.removeChild(contactoLi);
            eliminarContacto(nombre);//Eliminar contacto del localstorage
        });

        contactoLi.appendChild(contactoInfo);
        contactoLi.appendChild(botonEliminar);
        contactosContainer.appendChild(contactoLi);
    }

    // Función para eliminar un contacto
    function eliminarContacto(nombre) {
        contactos = contactos.filter(contacto => contacto.nombre !== nombre);
        guardarEnLocalStorage('contactos', contactos);//Actualizar localstorage
    }
});
