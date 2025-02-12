document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const nombreUsuario = document.getElementById('username').value;
    const contrasena = document.getElementById('password').value;

    if (nombreUsuario === '') {
        alert('Complete el campo de usuario.');
        return;
    }

    if (contrasena === '') {
        alert('Complete el campo de contraseña.');
        return;
    }

    console.log("Realizando solicitud fetch...");
    fetch('../json/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(usuarios => {
            console.log("Usuarios cargados:", usuarios); // Verifica si los usuarios se cargaron correctamente
            const usuario = usuarios.find(u => u.username === nombreUsuario && u.password === contrasena);

            if (usuario) {
                console.log("Usuario encontrado:", usuario); // Verifica si el usuario se encontró
                localStorage.setItem('loggedInUser', JSON.stringify(usuario));

                if (usuario.role === 'admin') {
                    window.location.href = '../html/admin.html';
                } else {
                    window.location.href = '../html/user.html';
                }
            } else {
                alert('Datos Incorrectos');
            }
        })
        .catch(error => {
            console.error('Error en el fetch:', error); // Muestra errores en la consola
            alert('Error al cargar los datos. Por favor, inténtalo de nuevo.');
        });
});