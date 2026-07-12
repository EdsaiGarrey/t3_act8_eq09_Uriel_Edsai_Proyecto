import { useState } from "react";
import { loginUsuario } from "../services/authService";
import { validarCamposLogin } from "../utils/validators";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    async function manejarLogin(e) {
        e.preventDefault();

        const mensajeValidacion = validarCamposLogin(username, password);

        if (mensajeValidacion) {
            setError(mensajeValidacion);
            return;
        }

        try {
            setCargando(true);
            setError("");

            const usuario = await loginUsuario(username, password);

            onLogin(usuario);
        } catch (error) {
            setError(error.message || "Usuario o contraseña incorrectos.");
        } finally {
            setCargando(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <div className="login-info">
                    <div className="login-icon">☕</div>
                    <h1>GarGuz Cafeteria</h1>
                    <p>Sistema de gestión para cafetería</p>
                </div>

                <div className="login-form">
                    <h2>Iniciar sesión</h2>
                    <p>Ingresa tus datos para continuar</p>

                    <form onSubmit={manejarLogin}>
                        <label>Usuario</label>
                        <input
                            type="text"
                            placeholder="Ejemplo: Administrador"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ejemplo: Admin123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <div className="alerta-error">{error}</div>}

                        <button type="submit" disabled={cargando}>
                            {cargando ? "Validando..." : "Entrar"}
                        </button>
                    </form>

                    <div className="datos-prueba">
                        <strong>Usuario de prueba:</strong>
                        <p>Usuario: emilys</p>
                        <p>Contraseña:emilyspass</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;