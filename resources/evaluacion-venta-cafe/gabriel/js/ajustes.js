document.getElementById('form-ajustes').addEventListener('submit', (e) => {
    e.preventDefault();
    let nuevaTasa = parseFloat(document.getElementById('ajuste-tasa').value);
    if (nuevaTasa > 0) { 
        db.config.tasa = nuevaTasa; 
        saveDB(); 
        alert('Tasa de cambio actualizada.'); 
    }
});

document.getElementById('form-user').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = document.getElementById('new-user').value.trim();
    const newPass = document.getElementById('new-pass').value.trim();
    
    if (newUser.length < 4) return alert('El usuario debe tener al menos 4 caracteres.');
    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(newPass)) return alert('Mínimo 6 caracteres (letras y números).');
    
    credenciales = { user: newUser, pass: newPass }; 
    localStorage.setItem('credenciales', JSON.stringify(credenciales));
    
    alert('Credenciales actualizadas. Inicia sesión nuevamente.'); 
    e.target.reset(); 
    logout(); 
});