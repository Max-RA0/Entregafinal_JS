function iniciarSesion() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // Verificar que los campos no estén vacíos
    if (!email || !password) {
        document.getElementById("loginMessage").innerHTML = "Por favor, ingresa todos los campos.";
        document.getElementById("loginMessage").style.color = "red";
        return; // Detener la ejecución si los campos están vacíos
    }

    // Obtener los datos del usuario desde el localStorage
    var usuarioGuardado = localStorage.getItem(email);

    if (usuarioGuardado) {
        // Convertir el string JSON a objeto
        var usuario = JSON.parse(usuarioGuardado);

        // Verificar las credenciales (email y password)
        if (usuario.password === password) {
            // Guardar el usuario logueado en el localStorage
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

            // Redirigir al dashboard o página principal
            window.location.href = "./registros.html"; // Cambia esto por la página que desees
        } else {
            document.getElementById("loginMessage").innerHTML = "Credenciales incorrectas. Intenta de nuevo.";
            document.getElementById("loginMessage").style.color = "red";
        }
    } else {
        document.getElementById("loginMessage").innerHTML = "El usuario no existe. Regístrate primero.";
        document.getElementById("loginMessage").style.color = "red";
    }
}

window.onload = function() {
    // Verificamos si el usuario ya está logueado
    var usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        // Si ya está logueado, redirigirlo a la página principal o dashboard
        window.location.href = "./registros.html"; // Cambiar a la página deseada
    }
};
