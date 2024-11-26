function RegistroUsuario() {
    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const usuario = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validar que todos los campos sean completados
    if (!nombre || !usuario || !password) {
        alert("Por favor, completa todos los campos.");
        return;  // Detener la ejecución si algún campo está vacío
    }

    // Verificar si el usuario ya está registrado en el localStorage
    const usuarioExistente = localStorage.getItem(usuario);
    if (usuarioExistente) {
        alert("El usuario ya está registrado. Por favor, inicia sesión.");
        return;  // Detener la ejecución si el usuario ya existe
    }

    // Crear un objeto de usuario
    const user = {
        nombre: nombre,
        usuario: usuario,
        password: password,
    };

    // Guardar el usuario en el localStorage con el correo como clave
    localStorage.setItem(usuario, JSON.stringify(user));

    // Redirigir al inicio de sesión después del registro
    window.location.href = './index.html'; // Redirige al login
}
