document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (!username || !password) {
        errorMessage.textContent = 'Por favor, complete todos los campos';
        return;
    }

    fetch('../json/data.json')
        .then(response => response.json())
        .then(usuarios => {
            console.log('Datos cargados:', usuarios);

            const usuario = usuarios.find(u => 
                u.credenciales.username === username && 
                u.credenciales.password === password
            );

            console.log('Usuario encontrado:', usuario);

            if (usuario) {
                const datosGuardados = {
                    username: usuario.credenciales.username,
                    password: usuario.credenciales.password,
                    role: usuario.credenciales.role,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    identificacion: usuario.identificacion,
                    residencia: usuario.residencia
                };

                console.log('Datos a guardar:', datosGuardados);
                localStorage.setItem('loggedInUser', JSON.stringify(datosGuardados));

                if (usuario.credenciales.role === 'admin') {
                    window.location.href = '../html/admin.html';
                } else {
                    window.location.href = '../html/user.html';
                }
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Error al intentar iniciar sesión. Por favor, intente nuevamente.';
        });
});