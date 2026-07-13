/* 
funcion
*/
import { useEffect, useState } from "react";

function ProductModal({ visible, productoEditar, onCerrar, onGuardar }) {
    const [formulario, setFormulario] = useState({
        title: "",
        category: "",
        price: "",
        stock: ""
    });

    useEffect(() => {
        if (productoEditar) {
            setFormulario({
                title: productoEditar.title || "",
                category: productoEditar.category || "",
                price: productoEditar.price || "",
                stock: productoEditar.stock || ""
            });
        } else {
            setFormulario({
                title: "",
                category: "",
                price: "",
                stock: ""
            });
        }
    }, [productoEditar, visible]);

    if (!visible) {
        return null;
    }

    function manejarCambio(e) {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    function manejarSubmit(e) {
        e.preventDefault();

        if (!formulario.title || !formulario.category || !formulario.price || !formulario.stock) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        onGuardar({
            ...formulario,
            price: Number(formulario.price),
            stock: Number(formulario.stock)
        });
    }

    return (
        <div className="modal-fondo">
            <div className="modal-contenido">
                <h2>{productoEditar ? "Editar producto" : "Nuevo producto"}</h2>

                <form onSubmit={manejarSubmit}>
                    <label>Nombre del producto</label>
                    <input
                        type="text"
                        name="title"
                        value={formulario.title}
                        onChange={manejarCambio}
                        placeholder="Ejemplo: Café americano"
                    />

                    <label>Categoría</label>
                    <input
                        type="text"
                        name="category"
                        value={formulario.category}
                        onChange={manejarCambio}
                        placeholder="Ejemplo: bebida"
                    />

                    <label>Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={formulario.price}
                        onChange={manejarCambio}
                        placeholder="25"
                    />

                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formulario.stock}
                        onChange={manejarCambio}
                        placeholder="30"
                    />

                    <div className="modal-acciones">
                        <button type="button" className="btn-cancelar" onClick={onCerrar}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn-guardar">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;