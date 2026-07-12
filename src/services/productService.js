const API_URL = "https://dummyjson.com/products";

const productosCafeteria = [
    { title: "Café americano", category: "Bebida", price: 25, stock: 30, estado: "Activo" },
    { title: "Capuchino", category: "Bebida", price: 38, stock: 20, estado: "Activo" },
    { title: "Chocolate caliente", category: "Bebida", price: 32, stock: 18, estado: "Activo" },
    { title: "Té helado", category: "Bebida", price: 28, stock: 25, estado: "Activo" },
    { title: "Frappé de vainilla", category: "Bebida", price: 45, stock: 15, estado: "Activo" },
    { title: "Licuado de fresa", category: "Bebida", price: 35, stock: 14, estado: "Activo" },
    { title: "Agua natural", category: "Bebida", price: 15, stock: 40, estado: "Activo" },
    { title: "Refresco", category: "Bebida", price: 20, stock: 35, estado: "Activo" },
    { title: "Sandwich", category: "Comida", price: 45, stock: 12, estado: "Activo" },
    { title: "Baguette de jamón", category: "Comida", price: 55, stock: 9, estado: "Bajo stock" },

    { title: "Croissant", category: "Panadería", price: 30, stock: 16, estado: "Activo" },
    { title: "Pan dulce", category: "Panadería", price: 18, stock: 22, estado: "Activo" },
    { title: "Dona de chocolate", category: "Postre", price: 22, stock: 14, estado: "Activo" },
    { title: "Pay de queso", category: "Postre", price: 35, stock: 8, estado: "Bajo stock" },
    { title: "Pastel de chocolate", category: "Postre", price: 40, stock: 10, estado: "Activo" },
    { title: "Galletas", category: "Snack", price: 18, stock: 25, estado: "Activo" },
    { title: "Brownie", category: "Postre", price: 28, stock: 11, estado: "Activo" },
    { title: "Muffin de vainilla", category: "Panadería", price: 26, stock: 13, estado: "Activo" },
    { title: "Nachos", category: "Snack", price: 35, stock: 7, estado: "Bajo stock" },
    { title: "Papas fritas", category: "Snack", price: 20, stock: 28, estado: "Activo" },

    { title: "Mollete", category: "Comida", price: 42, stock: 10, estado: "Activo" },
    { title: "Ensalada ligera", category: "Comida", price: 50, stock: 6, estado: "Bajo stock" },
    { title: "Hamburguesa sencilla", category: "Comida", price: 65, stock: 9, estado: "Bajo stock" },
    { title: "Hot dog", category: "Comida", price: 38, stock: 17, estado: "Activo" },
    { title: "Tostada", category: "Comida", price: 30, stock: 19, estado: "Activo" },
    { title: "Café latte", category: "Bebida", price: 42, stock: 18, estado: "Activo" },
    { title: "Malteada de chocolate", category: "Bebida", price: 48, stock: 12, estado: "Activo" },
    { title: "Té chai", category: "Bebida", price: 36, stock: 15, estado: "Activo" },
    { title: "Crepa dulce", category: "Postre", price: 45, stock: 8, estado: "Bajo stock" },
    { title: "Yogurt con granola", category: "Snack", price: 32, stock: 16, estado: "Activo" }
];

export async function obtenerProductos() {
    const respuesta = await fetch(`${API_URL}?limit=50&skip=0`);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los productos.");
    }

    const datos = await respuesta.json();

    const productosAdaptados = productosCafeteria.map((producto, index) => {
        const productoAPI = datos.products[index];

        return {
            id: productoAPI?.id || index + 1,
            title: producto.title,
            category: producto.category,
            price: producto.price,
            stock: producto.stock,
            estado: producto.estado
        };
    });

    return productosAdaptados;
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

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        return {
            id,
            ...producto,
            mensaje: "Producto editado localmente"
        };
    }

    return datos;
}

export async function eliminarProducto(id) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        return {
            id,
            isDeleted: true,
            mensaje: "Producto eliminado localmente"
        };
    }

    return datos;
}