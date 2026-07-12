const API_URL = "https://dummyjson.com/products";

export async function obtenerProductos() {
    const respuesta = await fetch(`${API_URL}?limit=50&skip=0`);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los productos.");
    }

    const datos = await respuesta.json();
    return datos.products;
}

export async function agregarProducto(producto) {
    const respuesta = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo agregar el producto.");
    }

    return await respuesta.json();
}

export async function editarProducto(id, producto) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo editar el producto.");
    }

    return await respuesta.json();
}

export async function eliminarProducto(id) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el producto.");
    }

    return await respuesta.json();
}