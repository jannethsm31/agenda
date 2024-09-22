const $ = (id) => document.querySelector(`.${id}`);

// Función para agregar los datos a los contenedores correspondientes
export const agregarDatos = (datos, claseContenedor) => {
    console.log(datos, claseContenedor);
    // Verifica si el string es JSON y conviértelo en un arreglo
    let parsedData;
    try {
        parsedData = JSON.parse(datos);  // Intenta convertir el string JSON a un objeto o arreglo
    } catch (error) {
        console.error('Error al parsear los datos:', error);
        parsedData = [];  // Si falla, inicializa como un arreglo vacío
    }

    const contenedor = $(claseContenedor);
    console.log(contenedor);

    if (Array.isArray(parsedData) && parsedData.length > 0) {
        parsedData.forEach(dato => {
            const elemento = document.createElement('p');
            elemento.className = "elemento";
            elemento.textContent = typeof dato === 'object' && dato.texto ? dato.texto : dato;
            contenedor.appendChild(elemento);
        });
    } else {
        contenedor.innerHTML = '<p>No hay datos disponibles</p>';
    }
};