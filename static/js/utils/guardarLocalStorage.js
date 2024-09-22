// Función que guarda los datos en LocalStorage
export function guardarEnLocalStorage(identificador, contenido ) {
    localStorage.setItem(identificador, JSON.stringify(contenido));
}