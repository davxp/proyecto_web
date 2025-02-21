// Función para cargar los datos del archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('../json/historial.json'); // Ruta al archivo JSON
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

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

// Función para generar la tabla
function generarTabla(data) {
    const tbody = document.querySelector("#historial-table tbody");

    data.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.identificacion}</td>
            <td>${item.problema}</td>
            <td>${item.horaSolicitud}</td>
            <td>${item.horaSolucion}</td>
        `;

        tbody.appendChild(row);
    });
}

// Cargar los datos y generar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const datos = await cargarDatos();
    if (datos) {
        generarTabla(datos);
    }
});