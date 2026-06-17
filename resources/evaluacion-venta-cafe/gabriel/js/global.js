//1. Manejo de la RAM
let db = {
    proveedores: JSON.parse(localStorage.getItem('proveedores')) || [],
    clientes: JSON.parse(localStorage.getItem('clientes')) || [],
    transacciones: JSON.parse(localStorage.getItem('transacciones')) || [],
    config: JSON.parse(localStorage.getItem('config')) || { tasa: 1 }
};

let credenciales = JSON.parse(localStorage.getItem('credenciales')) || { user: 'admin', pass: '1234' };
let editMode = { proveedores: null, clientes: null };

//2. Funciones de guardar memoria 
function saveDB() {
    localStorage.setItem('proveedores', JSON.stringify(db.proveedores));
    localStorage.setItem('clientes', JSON.stringify(db.clientes));
    localStorage.setItem('transacciones', JSON.stringify(db.transacciones));
    localStorage.setItem('config', JSON.stringify(db.config));
}

// validaciones
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function esRIFValido(rif) {
    return /^[VJEG]-\d{8,9}$/i.test(rif.trim());
}

function validarNumero(valor) {
    if (valor.toString().trim() === '') return false;
    if (isNaN(valor)) return false;
    return parseFloat(valor) >= 0;
}

//logica de las cuentas
function obtenerInventarioActual() {
    let inventario = { suave: 0, normal: 0, fuerte: 0 };
    db.transacciones.forEach(t => {
        let multiplicador = t.tipo === 'compra' ? 1 : -1;
        inventario.suave += t.detalle.suave.kg * multiplicador;
        inventario.normal += t.detalle.normal.kg * multiplicador;
        inventario.fuerte += t.detalle.fuerte.kg * multiplicador;
    });
    return inventario;
}

// control de la pantalla
function showModule(modId) {
    document.querySelectorAll('.module').forEach(m => m.classList.add('hidden'));
    document.getElementById('mod-' + modId).classList.remove('hidden');
    
    // actualizar pantalla
    if (modId === 'transacciones') cargarEntidades();
    if (modId === 'ajustes') document.getElementById('ajuste-tasa').value = db.config.tasa;
    if (modId === 'proveedores') renderListaProveedores();
    if (modId === 'clientes') renderListaClientes();
}