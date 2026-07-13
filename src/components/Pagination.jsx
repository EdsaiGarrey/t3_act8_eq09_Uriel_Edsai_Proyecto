/* 
funcion
*/
function Pagination({ paginaActual, totalPaginas, cambiarPagina }) {
    const paginas = [];

    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
    }

    return (
        <div className="paginacion">
            <div className="registros">
                <span>Mostrar 10 registros</span>
            </div>

            <div className="botones-paginacion">
                <button
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
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
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Pagination;