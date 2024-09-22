const $ = (id) => document.querySelector(`.${id}`);

// TODO: Arreglar esto
// Función para agregar los datos a los contenedores correspondientes
export const agregarDatos = (datos, claseContenedor) => {
    console.log(datos, datos.length, claseContenedor)
    const contenedor = $(claseContenedor);
    console.log(contenedor)
    if (datos && datos.length > 0) {
        datos.forEach(dato => {
            const elemento = document.createElement('p');
            elemento.textContent = dato;
            contenedor.appendChild(elemento);
        });
    } else {
        contenedor.innerHTML = '<p>No hay datos disponibles</p>';
    }
};
