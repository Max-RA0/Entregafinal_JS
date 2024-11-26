// Función para gestionar el usuario (guardar o actualizar)
function gestionarUsuario() {
    const cedula = document.getElementById('nroUsuario').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    // Creamos el objeto del usuario
    const usuario = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        fechaNacimiento: fechaNacimiento
    };

    // Recuperamos los usuarios existentes del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificamos si ya existe un usuario con la misma cédula o correo
    const index = usuarios.findIndex(u => u.cedula === cedula || u.correo === correo);
    if (index !== -1) {
        // Si el usuario ya existe, lo actualizamos
        usuarios[index] = usuario;
    } else {
        // Si no existe, agregamos un nuevo usuario
        usuarios.push(usuario);
    }

    // Guardamos los usuarios actualizados en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpiamos el formulario y cerramos el modal
    document.getElementById('userForm').reset();
    $('#userModal').modal('hide');
    mostrarUsuarios();  // Refrescar la tabla de usuarios
}

// Función para mostrar usuarios en la tabla
function mostrarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = '';  // Limpiamos la tabla

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

// Función para ver los detalles del usuario en un modal
function verDetalles(cedula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cedula === cedula);

    // Mostrar los detalles en el modal
    document.getElementById('viewNroUsuario').value = usuario.cedula;
    document.getElementById('viewNombre').value = usuario.nombre;
    document.getElementById('viewApellido').value = usuario.apellido;
    document.getElementById('viewTelefono').value = usuario.telefono;
    document.getElementById('viewCorreo').value = usuario.correo;
    document.getElementById('viewDireccion').value = usuario.direccion;
    document.getElementById('viewFechaNacimiento').value = usuario.fechaNacimiento;

    // Abrir el modal
    $('#viewUserModal').modal('show');
}

// Función para eliminar un usuario
function eliminarUsuario(cedula) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(usuario => usuario.cedula !== cedula);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarUsuarios();  // Refrescar la tabla de usuarios
}

// Función para editar un usuario
function editarUsuario(cedula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cedula === cedula);

    // Rellenamos los campos del formulario de edición
    document.getElementById('nroUsuario').value = usuario.cedula;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('direccion').value = usuario.direccion;
    document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;

    // Cambiar el botón para actualizar el usuario
    document.getElementById('saveButton').onclick = function() {
        gestionarUsuario();  // Guardamos los cambios de la edición
    };

    // Abrir el modal para editar
    $('#userModal').modal('show');
}

// Función para limpiar el formulario de nuevo usuario
function limpiarFormulario() {
    document.getElementById('userForm').reset();  // Limpia los campos del formulario
    $('#userModal').modal('hide');  // Cierra el modal de nuevo usuario si estaba abierto
}

// Función para cerrar el modal de "Detalles" y limpiar formulario de registro si es necesario
function cerrarVistaDetalles() {
    document.getElementById('viewUserForm').reset();  // Limpia los campos del modal de vista
    $('#viewUserModal').modal('hide');  // Cierra el modal de vista de detalles
}

// Función de registro de usuario
function RegistroUsuario() {
    const user = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    // Guardamos el usuario en el localStorage
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);

    // Redirigimos a la página de inicio de sesión
    window.location.href = './inicio_sesion.html';
}
// Verificar si el usuario está logueado y mostrar su nombre
window.onload = function() {
    // Verificamos si el usuario está logueado
    var usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // Si el usuario está logueado, mostramos su nombre
    if (usuarioLogueado) {
        document.getElementById("sessionInfo").style.display = "flex";
        document.getElementById("usernameDisplay").innerText = "Bienvenido, " + usuarioLogueado.nombre; // O usuarioLogueado.email
    } else {
        document.getElementById("sessionInfo").style.display = "none";
    }

    // Mostrar la lista de usuarios en la página de gestión
    mostrarUsuarios();
};

// Función para cerrar sesión
function cerrarSesion() {
    // Limpiar la información del usuario en el localStorage
    localStorage.removeItem("usuarioLogueado");

    // Redirigir al login
    window.location.href = "./index.html"; // Cambiar a la página deseada
}