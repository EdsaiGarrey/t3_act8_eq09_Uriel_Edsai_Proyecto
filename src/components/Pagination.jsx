function Pagination({ paginaActual, totalPaginas, cambiarPagina }) {
    const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

    return (
        <div className="paginacion">
            <div className="registros">
                <span>Mostrar 10 registros</span>
            </div>

            <div className="botones-paginacion">
                <button
                    disabled={paginaActual === 1}
                    onClick={() => cambiarPagina(paginaActual - 1)}
                >
                    Anterior
                </button>

                {paginas.map((pagina) => (
                    <button
                        key={pagina}
                        className={paginaActual === pagina ? "btn-numero activo" : "btn-numero"}
                        onClick={() => cambiarPagina(pagina)}
                    >
                        {pagina}
                    </button>
                ))}

                <button
                    disabled={paginaActual === totalPaginas}
                    onClick={() => cambiarPagina(paginaActual + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Pagination;