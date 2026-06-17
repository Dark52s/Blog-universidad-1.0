function renderListaClientes() {
    const listDiv = document.getElementById('lista-clientes');
    if (!listDiv) return;

    let html = '<h3>Lista de Clientes</h3>';
    if (db.clientes.length === 0) {
        listDiv.innerHTML = html + '<p>No hay registros aún.</p>';
        return;
    }

    db.clientes.forEach(c => {
        if (!c) return;
        let btn = c.activo 
            ? `<button class="btn-danger" onclick="toggleActivoCliente(${c.id})">Desactivar</button>` 
            : `<button onclick="toggleActivoCliente(${c.id})">Activar</button>`;
            
        let cNombre = (c.contacto && c.contacto.nombre) ? c.contacto.nombre : 'N/A';
        let cTel = (c.contacto && c.contacto.tel) ? c.contacto.tel : 'N/A';
        let cCorreo = (c.contacto && c.contacto.correo) ? c.contacto.correo : 'N/A';

        html += `
        <div class="card">
            <strong>${c.negocio || 'Desconocido'} (${c.rif || 'Sin RIF'})</strong> - Estado: ${c.activo ? '✅ Activo' : '❌ Inactivo'}<br>
            Contacto: ${cNombre} | Cel: ${cTel} | Correo: ${cCorreo}<br>
            <button class="btn-edit" onclick="editarCliente(${c.id})">Editar Datos</button>
            ${btn}
        </div>`;
    });
    listDiv.innerHTML = html;
}

function toggleActivoCliente(id) {
    let c = db.clientes.find(i => i.id === id);
    if (c) { c.activo = !c.activo; saveDB(); renderListaClientes(); }
}

function editarCliente(id) {
    let c = db.clientes.find(i => i.id === id);
    if (c) {
        editMode.clientes = id;
        document.getElementById('cli-negocio').value = c.negocio;
        document.getElementById('cli-rif').value = c.rif;
        document.getElementById('cli-nombre').value = c.contacto.nombre;
        document.getElementById('cli-cedula').value = c.contacto.cedula;
        document.getElementById('cli-tel').value = c.contacto.tel;
        document.getElementById('cli-correo').value = c.contacto.correo;
        
        document.getElementById('btn-cli').innerText = "Actualizar Datos";
        window.scrollTo(0, 0);
    }
}

document.getElementById('form-cli').addEventListener('submit', (e) => {
    e.preventDefault();
    let rif = document.getElementById('cli-rif').value.trim().toUpperCase();
    let negocio = document.getElementById('cli-negocio').value.trim();
    let tel = document.getElementById('cli-tel').value.trim();
    let cedula = document.getElementById('cli-cedula').value.trim();

    if (!esRIFValido(rif) || negocio === '' || isNaN(tel) || isNaN(cedula)) {
        return alert('Verifique los datos ingresados.');
    }

    let contacto = {
        nombre: document.getElementById('cli-nombre').value.trim(),
        cedula, tel, correo: document.getElementById('cli-correo').value.trim()
    };

    if (editMode.clientes !== null) {
        let item = db.clientes.find(i => i.id === editMode.clientes);
        item.negocio = negocio; item.rif = rif; item.contacto = contacto;
        alert('Cliente actualizado.');
    } else {
        db.clientes.push({ id: Date.now(), negocio, rif, activo: true, contacto });
        alert('Cliente guardado.');
    }

    saveDB();
    document.getElementById('form-cli').reset();
    editMode.clientes = null;
    document.getElementById('btn-cli').innerText = 'Guardar Cliente';
    renderListaClientes();
});