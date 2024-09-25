const $ = (id) => document.querySelector(`.${id}`);

// Función para agregar los datos a los contenedores correspondientes
export const agregarDatos = (datos, claseContenedor) => {

    // Verifica si los datos son un string JSON y conviértelo
    let parsedData;
    try {
        parsedData = JSON.parse(datos);  // Intenta convertir el string JSON a un objeto o arreglo
    } catch (error) {
        console.error('Error al parsear los datos:', error);
        parsedData = [];  // Si falla, inicializa como un arreglo vacío
    }

    const contenedor = $(claseContenedor);

    // Verifica si es un arreglo y muestra los datos correspondientes
    if (Array.isArray(parsedData) && parsedData.length > 0) {
        parsedData.forEach(dato => {
            const elemento = document.createElement('p');
            if (typeof dato === 'object') {
                // Muestra cada propiedad si el dato es un objeto
                elemento.textContent = Object.values(dato).join(' - ');
            } else {
                elemento.textContent = dato;
            }
            contenedor.appendChild(elemento);
        });
    }

    // Si es un objeto con claves y valores (como actividades con fechas)
    else if (typeof parsedData === 'object' && parsedData !== null && !Array.isArray(parsedData)) {
        for (let key in parsedData) {
            const subArray = parsedData[key];  // Cada fecha tiene un arreglo asociado
            const sectionHeader = document.createElement('p');
            sectionHeader.textContent = `Actividades para el ${key}:`;
            contenedor.appendChild(sectionHeader);

            subArray.forEach(dato => {
                const elemento = document.createElement('p');
                dato['completada'] = dato['completada'] === false ? 'Sin completar' : 'Completada'
                elemento.textContent = Object.values(dato).join(' - ');
                contenedor.appendChild(elemento);
            });
        }
    }
    else {
        contenedor.innerHTML = '<p>No hay datos disponibles</p>';
    }
};