function ProductTable({ productos, onEditar, onEliminar }) {
    return (
        <div className="tabla-contenedor">
            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Existencia</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="sin-datos">
                                No se encontraron productos.
                            </td>
                        </tr>
                    ) : (
                        productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>#{producto.id}</td>
                                <td>{producto.title}</td>
                                <td>{producto.category}</td>
                                <td>${producto.price}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <span className={producto.stock > 10 ? "estado activo" : "estado bajo"}>
                                        {producto.stock > 10 ? "Activo" : "Bajo stock"}
                                    </span>
                                </td>
                                <td>
                                    <div className="acciones-tabla">
                                        <button
                                            className="btn-editar"
                                            onClick={() => onEditar(producto)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn-eliminar"
                                            onClick={() => onEliminar(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;