// login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let user = document.getElementById('user').value.trim();
    let pass = document.getElementById('pass').value;

    if (user === credenciales.user && pass === credenciales.pass) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('app-section').classList.remove('hidden');
        showModule('proveedores');
    } else {
        alert('Credenciales incorrectas');
    }
});

function logout() {
    document.getElementById('app-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('user').value = ''; 
    document.getElementById('pass').value = '';
}