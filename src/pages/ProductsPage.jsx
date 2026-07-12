import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import Pagination from "../components/Pagination";
import {
    obtenerProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto
} from "../services/productService";

function obtenerValorURL(nombre, valorPorDefecto) {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get(nombre) || valorPorDefecto;
}

function ProductsPage() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [busqueda, setBusqueda] = useState(obtenerValorURL("search", ""));
    const [categoria, setCategoria] = useState(obtenerValorURL("category", "todas"));
    const [paginaActual, setPaginaActual] = useState(Number(obtenerValorURL("page", 1)));

    const limite = 10;

    const [modalVisible, setModalVisible] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);

    useEffect(() => {
        cargarProductos();
    }, []);

    function actualizarURL(page, search, category) {
        const parametros = new URLSearchParams();

        parametros.set("page", page);
        parametros.set("limit", 10);

        if (search) {
            parametros.set("search", search);
        }

        if (category && category !== "todas") {
            parametros.set("category", category);
        }

        const nuevaURL = `${window.location.pathname}?${parametros.toString()}`;
        window.history.pushState({}, "", nuevaURL);
    }

    async function cargarProductos() {
        try {
            setCargando(true);
            setError("");

            const datos = await obtenerProductos();
            setProductos(datos);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    const categorias = [
        "todas",
        ...new Set(productos.map((producto) => producto.category))
    ];

    const productosFiltrados = productos.filter((producto) => {
        const coincideBusqueda = producto.title
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        const coincideCategoria =
            categoria === "todas" || producto.category === categoria;

        return coincideBusqueda && coincideCategoria;
    });

    const totalPaginas = Math.ceil(productosFiltrados.length / limite) || 1;

    const inicio = (paginaActual - 1) * limite;
    const fin = inicio + limite;
    const productosPaginados = productosFiltrados.slice(inicio, fin);

    function manejarBusqueda(e) {
        const valor = e.target.value;

        setBusqueda(valor);
        setPaginaActual(1);

        actualizarURL(1, valor, categoria);
    }

    function manejarCategoria(e) {
        const valor = e.target.value;

        setCategoria(valor);
        setPaginaActual(1);

        actualizarURL(1, busqueda, valor);
    }

    function cambiarPagina(nuevaPagina) {
        if (nuevaPagina < 1 || nuevaPagina > totalPaginas) {
            return;
        }

        setPaginaActual(nuevaPagina);
        actualizarURL(nuevaPagina, busqueda, categoria);
    }

    function abrirModalAgregar() {
        setProductoEditar(null);
        setModalVisible(true);
    }

    function abrirModalEditar(producto) {
        const confirmar = window.confirm(`¿Deseas editar el producto "${producto.title}"?`);

        if (confirmar) {
            setProductoEditar(producto);
            setModalVisible(true);
        }
    }

    async function guardarProducto(productoFormulario) {
        try {
            if (productoEditar) {
                const productoActualizado = await editarProducto(
                    productoEditar.id,
                    productoFormulario
                );

                setProductos(
                    productos.map((producto) =>
                        producto.id === productoEditar.id
                            ? { ...producto, ...productoActualizado, ...productoFormulario }
                            : producto
                    )
                );

                alert("Producto editado correctamente.");
            } else {
                const nuevoProductoAPI = await agregarProducto(productoFormulario);

                const nuevoProducto = {
                    ...productoFormulario,
                    id: nuevoProductoAPI.id || Date.now()
                };

                setProductos([nuevoProducto, ...productos]);
                alert("Producto agregado correctamente.");
            }

            setModalVisible(false);
            setProductoEditar(null);
        } catch (error) {
            alert(error.message);
        }
    }

    async function manejarEliminar(id) {
        const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");

        if (!confirmar) {
            return;
        }

        try {
            await eliminarProducto(id);

            setProductos(productos.filter((producto) => producto.id !== id));

            alert("Producto eliminado correctamente.");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section className="productos-page">
            <div className="encabezado-seccion">
                <div>
                    <h2>Gestión de Productos</h2>
                    <p>Consulta, filtra y administra los productos registrados.</p>
                </div>

                <button className="btn-principal" onClick={abrirModalAgregar}>
                    + Nuevo producto
                </button>
            </div>

            <div className="filtros">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={busqueda}
                    onChange={manejarBusqueda}
                />

                <select value={categoria} onChange={manejarCategoria}>
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === "todas" ? "Todas las categorías" : cat}
                        </option>
                    ))}
                </select>
            </div>

            {cargando && <p className="mensaje-info">Cargando productos...</p>}

            {error && <p className="mensaje-error">{error}</p>}

            {!cargando && !error && (
                <>
                    <ProductTable
                        productos={productosPaginados}
                        onEditar={abrirModalEditar}
                        onEliminar={manejarEliminar}
                    />

                    <Pagination
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        cambiarPagina={cambiarPagina}
                    />
                </>
            )}

            <ProductModal
                visible={modalVisible}
                productoEditar={productoEditar}
                onCerrar={() => setModalVisible(false)}
                onGuardar={guardarProducto}
            />
        </section>
    );
}

export default ProductsPage;