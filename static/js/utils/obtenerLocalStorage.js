// Función que obtiene los datos del local Storage
export function obtenerLocalStorage(identificador) {
    let datos = localStorage.getItem(identificador)
    return datos
}