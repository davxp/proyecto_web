// Obtener el nombre del usuario desde localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
    alert('No hay sesión activa. Redirigiendo al login...');
    window.location.href = '../html/login.html';
} else {
    document.getElementById('username').textContent = loggedInUser.username;
}

// Botón de cerrar sesión
document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../html/login.html';
});

// Cargar datos desde el archivo JSON y llenar la tabla
fetch('../json/data.json')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('#user-table tbody');
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.identificacion}</td>
                <td>${user.residencia}</td>
                <td>${user.problema}</td>
                <td>${user.estado}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));