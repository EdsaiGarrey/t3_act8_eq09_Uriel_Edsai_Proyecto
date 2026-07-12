export async function loginUsuario(username, password) {
    const respuesta = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.message || "Usuario o contraseña incorrectos.");
    }

    return datos;
}