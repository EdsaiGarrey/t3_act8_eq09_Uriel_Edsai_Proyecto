export function validarCamposLogin(username, password) {
    if (!username.trim() || !password.trim()) {
        return "El usuario y la contraseña son obligatorios.";
    }

    if (username.trim().length < 3) {
        return "El usuario debe tener al menos 3 caracteres.";
    }

    if (password.trim().length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }

    return "";
}