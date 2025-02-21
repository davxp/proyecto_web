// Verificar sesión y obtener datos del usuario
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
    alert('No hay sesión activa. Redirigiendo al login...');
    window.location.href = '../html/login.html';
} else {
    document.getElementById('username').textContent = loggedInUser.username;
}

// Manejar el cierre de sesión
document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../html/login.html';
}); 