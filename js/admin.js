// Configuración de jsonbin.io
const API_KEY = '$2a$10$Qjsjd2HR06a2yO1IM5EDqO8vIGC.7bqWdWewihbjpAqhxUAoaZ6Wm';
const BIN_ID = '67b7f372acd3cb34a8ea9bf0';
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

console.log('URL de la API:', API_URL); // Verificar URL

// Variables globales
let usuarios = [];
let editingId = null;

// Verificar sesión
document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento cargado, iniciando aplicación...'); // Verificar inicio
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('Usuario logueado:', loggedInUser); // Verificar usuario

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        console.log('Usuario no autorizado o no es admin'); // Verificar autorización
        alert('Acceso no autorizado');
        window.location.href = '../html/login.html';
        return;
    }
    
    document.getElementById('username').textContent = `${loggedInUser.nombre} ${loggedInUser.apellido}`;
    cargarDatos();
});

// Elementos del DOM
const userTable = document.getElementById('user-table').getElementsByTagName('tbody')[0];
const modal = document.getElementById('user-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const userForm = document.getElementById('user-form');
const addUserBtn = document.getElementById('add-user-btn');

// Funciones CRUD
const cargarDatos = () => {
    console.log('Iniciando carga de datos...'); // Verificar inicio de carga
    axios.get(`${API_URL}/latest`, {
        headers: {
            'X-Master-Key': API_KEY
        }
    })
    .then(response => {
        console.log('Respuesta completa:', response.data); // Ver respuesta completa
        console.log('Record recibido:', response.data.record); // Ver el record
        usuarios = response.data.record.usuarios;
        console.log('Usuarios cargados:', usuarios); // Ver array de usuarios
        renderizarTabla();
    })
    .catch(error => {
        console.error('Error detallado al cargar usuarios:', error.response || error); // Ver error detallado
        alert('Error al cargar los usuarios');
    });
};

const crearUsuario = (usuario) => {
    console.log('Creando nuevo usuario:', usuario); // Ver datos del nuevo usuario
    usuarios.push(usuario);
    actualizarDatos();
};

const actualizarUsuario = (id, usuarioActualizado) => {
    console.log('Actualizando usuario:', id, usuarioActualizado); // Ver datos de actualización
    usuarios[id] = usuarioActualizado;
    actualizarDatos();
};

const eliminarUsuario = (id) => {
    console.log('Intentando eliminar usuario:', id); // Ver ID a eliminar
    if (confirm('¿Está seguro de eliminar este usuario?')) {
        usuarios.splice(id, 1);
        actualizarDatos();
    }
};

const actualizarDatos = () => {
    const datosActualizados = { usuarios: usuarios };
    console.log('Enviando datos actualizados:', datosActualizados); // Ver datos a enviar

    axios.put(API_URL, datosActualizados, {
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        }
    })
    .then(response => {
        console.log('Datos actualizados correctamente:', response.data); // Confirmar actualización
        renderizarTabla();
    })
    .catch(error => {
        console.error('Error detallado al actualizar:', error.response || error); // Ver error detallado
        alert('Error al actualizar los datos');
    });
};

// Funciones de UI
const renderizarTabla = () => {
    console.log('Renderizando tabla con usuarios:', usuarios); // Ver datos a renderizar
    userTable.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.identificacion}</td>
            <td>${usuario.residencia}</td>
            <td>${usuario.problema}</td>
            <td>${usuario.estado}</td>
            <td>
                <button onclick="editarUsuario(${index})">Editar</button>
                <button onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;
    });
    console.log('Tabla renderizada completamente'); // Confirmar renderizado
};

const mostrarModal = (titulo = 'Agregar Usuario') => {
    console.log('Mostrando modal:', titulo); // Verificar apertura de modal
    document.getElementById('modal-title').textContent = titulo;
    modal.style.display = 'block';
};

const ocultarModal = () => {
    console.log('Ocultando modal'); // Verificar cierre de modal
    modal.style.display = 'none';
    userForm.reset();
    editingId = null;
};

const editarUsuario = (id) => {
    console.log('Editando usuario:', id); // Ver ID en edición
    editingId = id;
    const usuario = usuarios[id];
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('identificacion').value = usuario.identificacion;
    document.getElementById('residencia').value = usuario.residencia;
    document.getElementById('problema').value = usuario.problema;
    document.getElementById('estado').value = usuario.estado;
    mostrarModal('Editar Usuario');
};

// Event Listeners
addUserBtn.addEventListener('click', () => mostrarModal());
closeBtn.addEventListener('click', ocultarModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) ocultarModal();
});

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Formulario enviado'); // Verificar envío de formulario
    
    const usuario = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        identificacion: document.getElementById('identificacion').value,
        residencia: document.getElementById('residencia').value,
        problema: document.getElementById('problema').value,
        estado: document.getElementById('estado').value
    };
    
    console.log('Datos del formulario:', usuario); // Ver datos del formulario

    if (editingId !== null) {
        actualizarUsuario(editingId, usuario);
    } else {
        crearUsuario(usuario);
    }

    ocultarModal();
});

document.getElementById('logout-button').addEventListener('click', () => {
    console.log('Cerrando sesión'); // Verificar cierre de sesión
    localStorage.removeItem('loggedInUser');
    window.location.href = '../html/login.html';
});

// Hacer funciones disponibles globalmente
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;