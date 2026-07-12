function Sidebar({ vistaActual, cambiarVista }) {
    return (
        <aside className="sidebar">
            <div className="logo">
                <span className="logo-icon">☕</span>
                <div>
                   <h2>GarGuz</h2>
                    <p>Sistema de gestión</p>
                </div>
            </div>

            <nav className="menu">
                <button
                    className={vistaActual === "dashboard" ? "menu-item active" : "menu-item"}
                    onClick={() => cambiarVista("dashboard")}
                >
                    Inicio
                </button>

                <button
                    className={vistaActual === "productos" ? "menu-item active" : "menu-item"}
                    onClick={() => cambiarVista("productos")}
                >
                    Productos
                </button>

                <button className="menu-item">
                    Usuarios
                </button>

                <button className="menu-item">
                    Reportes
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;