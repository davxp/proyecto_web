document.getElementById("turnoForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Captura los datos del formulario
    const formData = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
    };

    // Envía los datos a Google Sheets
    enviarDatos(formData);
});

function enviarDatos(data) {
    const url = "https://script.google.com/macros/s/AKfycbxPCymdsQ529HpE31bAG_ZzSyIxoImRxvn1GMARxQ1fYzYeJPkLflGrLc1108R0GcE/exec"; // Reemplaza con la URL de tu API

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("Success:", result);
            alert("Datos guardados con éxito en Google Sheets");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Hubo un error al guardar los datos");
        });
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