// Función para gestionar el usuario (guardar o actualizar)
function gestionarUsuario() {
    const cedula = document.getElementById('nroUsuario').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();

    if (!cedula || !nombre || !correo) {
        mostrarAlerta("Cédula, nombre y correo son obligatorios", "danger");
        return;
    }

    // Creamos el objeto del usuario
    const usuario = {
        cedula,
        nombre,
        apellido,
        telefono,
        correo,
        direccion,
        fechaNacimiento
    };

    // Recuperamos los usuarios existentes del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificamos si ya existe un usuario con la misma cédula o correo
    const index = usuarios.findIndex(u => u.cedula === cedula || u.correo === correo);
    if (index !== -1) {
        usuarios[index] = usuario; // Actualizar usuario existente
        mostrarAlerta("Usuario actualizado con éxito", "info");
    } else {
        usuarios.push(usuario); // Agregar nuevo usuario
        mostrarAlerta("Usuario agregado con éxito", "success");
    }

    // Guardamos los usuarios actualizados en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpiamos el formulario y cerramos el modal
    document.getElementById('userForm').reset();
    $('#userModal').modal('hide');
    mostrarUsuarios(); // Refrescar la tabla de usuarios
}

// Función para mostrar usuarios en la tabla (acepta una lista filtrada opcional)
function mostrarUsuarios(filtrados = null) {
    const usuarios = filtrados || JSON.parse(localStorage.getItem('usuarios')) || [];
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = ''; // Limpiamos la tabla

    if (usuarios.length === 0) {
        userTable.innerHTML = '<tr><td colspan="8">No se encontraron usuarios</td></tr>';
        return;
    }

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.cedula}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>
                <div class="btn-container">
                    <button class="btn btn-info btn-sm" onclick="verDetalles('${usuario.cedula}')">Ver</button>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario('${usuario.cedula}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.cedula}')">Eliminar</button>
                </div>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Función para buscar usuarios
document.getElementById('buscador').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const resultados = usuarios.filter(usuario =>
        usuario.cedula.toLowerCase().includes(query) ||
        usuario.nombre.toLowerCase().includes(query) ||
        usuario.apellido.toLowerCase().includes(query) ||
        usuario.correo.toLowerCase().includes(query)
    );
    mostrarUsuarios(resultados); // Mostrar resultados filtrados
});

// Función para mostrar mensajes al usuario
function mostrarAlerta(mensaje, tipo = 'success') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000); // Quitar la alerta después de 3 segundos
}

// Funciones existentes...
function verDetalles(cedula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cedula === cedula);
    if (!usuario) return;

    document.getElementById('viewNroUsuario').value = usuario.cedula;
    document.getElementById('viewNombre').value = usuario.nombre;
    document.getElementById('viewApellido').value = usuario.apellido;
    document.getElementById('viewTelefono').value = usuario.telefono;
    document.getElementById('viewCorreo').value = usuario.correo;
    document.getElementById('viewDireccion').value = usuario.direccion;
    document.getElementById('viewFechaNacimiento').value = usuario.fechaNacimiento;

    $('#viewUserModal').modal('show');
}

function eliminarUsuario(cedula) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(usuario => usuario.cedula !== cedula);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarUsuarios(); // Refrescar tabla
    mostrarAlerta("Usuario eliminado con éxito", "success");
}

function editarUsuario(cedula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cedula === cedula);
    if (!usuario) return;

    document.getElementById('nroUsuario').value = usuario.cedula;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('direccion').value = usuario.direccion;
    document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;

    document.getElementById('saveButton').onclick = function () {
        gestionarUsuario();
    };

    $('#userModal').modal('show');
}

// Código para la sesión y carga inicial
window.onload = function () {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado) {
        document.getElementById("sessionInfo").style.display = "flex";
        document.getElementById("usernameDisplay").innerText = "Bienvenido, " + usuarioLogueado.nombre;
    } else {
        document.getElementById("sessionInfo").style.display = "none";
    }
    mostrarUsuarios();
};

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.replace("./index.html");
}
