document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.getElementById('formContacto');
    const nombreContacto = document.getElementById('nombreContacto');
    const telefonoContacto = document.getElementById('telefonoContacto');
    const emailContacto = document.getElementById('emailContacto');
    const contactosContainer = document.getElementById('contactosContainer');

    // Función para agregar un nuevo contacto
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = nombreContacto.value.trim();
        const telefono = telefonoContacto.value.trim();
        const email = emailContacto.value.trim();

        if (nombre && telefono && email) {
            agregarContacto(nombre, telefono, email);
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
        });

        contactoLi.appendChild(contactoInfo);
        contactoLi.appendChild(botonEliminar);
        contactosContainer.appendChild(contactoLi);
    }
});
