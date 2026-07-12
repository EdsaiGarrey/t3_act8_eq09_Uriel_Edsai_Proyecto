function DashboardPage({ cambiarVista }) {
    return (
        <section className="contenido-simple">
            <div className="icono-central">☕</div>

            <h2>Bienvenido al sistema de Cafeteria GarGuz</h2>
            <p>Selecciona una opción del menú lateral para comenzar.</p>

            <div className="acciones-dashboard">
                <button onClick={() => cambiarVista("productos")}>
                    Ver productos
                </button>
            </div>
        </section>
    );
}

export default DashboardPage;