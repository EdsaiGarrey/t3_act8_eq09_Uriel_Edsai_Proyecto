/* 
funcion
*/
function Navbar({ usuario, titulo, cerrarSesion }) {
    return (
        <header className="navbar">
            <h1>{titulo}</h1>

            <div className="usuario-navbar">
                <img
                    src={usuario?.image}
                    alt="Foto de usuario"
                    className="foto-usuario"
                />

                <div>
                    <strong>{usuario?.firstName} {usuario?.lastName}</strong>
                    <p>@{usuario?.username}</p>
                </div>

                <button className="btn-salir" onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </div>
        </header>
    );
}

export default Navbar;