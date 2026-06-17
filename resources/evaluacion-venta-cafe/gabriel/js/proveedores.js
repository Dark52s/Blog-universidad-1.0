function renderListaProveedores() {
    const listDiv = document.getElementById('lista-proveedores');
    if (!listDiv) return;

    let html = '<h3>Lista de Proveedores</h3>';
    if (db.proveedores.length === 0) {
        listDiv.innerHTML = html + '<p>No hay registros aún.</p>';
        return;
    }

    db.proveedores.forEach(p => {
        if (!p) return;
        let btn = p.activo 
            ? `<button class="btn-danger" onclick="toggleActivoProveedor(${p.id})">Desactivar</button>` 
            : `<button onclick="toggleActivoProveedor(${p.id})">Activar</button>`;
        
        let precios = p.precios || { suave: 0, normal: 0, fuerte: 0 };
        let cNombre = (p.contacto && p.contacto.nombre) ? p.contacto.nombre : 'N/A';
        let cTel = (p.contacto && p.contacto.tel) ? p.contacto.tel : 'N/A';
        let cCorreo = (p.contacto && p.contacto.correo) ? p.contacto.correo : 'N/A';

        html += `
        <div class="card">
            <strong>${p.negocio || 'Desconocido'} (${p.rif || 'Sin RIF'})</strong> - Estado: ${p.activo ? '✅ Activo' : '❌ Inactivo'}<br>
            Contacto: ${cNombre} | Cel: ${cTel} | Correo: ${cCorreo}<br>
            <small>Precios USD: Suave $${precios.suave} | Normal $${precios.normal} | Fuerte $${precios.fuerte}</small><br>
            <button class="btn-edit" onclick="editarProveedor(${p.id})">Editar Datos</button>
            ${btn}
        </div>`;
    });
    listDiv.innerHTML = html;
}

function toggleActivoProveedor(id) {
    let p = db.proveedores.find(i => i.id === id);
    if (p) { p.activo = !p.activo; saveDB(); renderListaProveedores(); }
}

function editarProveedor(id) {
    let p = db.proveedores.find(i => i.id === id);
    if (p) {
        editMode.proveedores = id;
        document.getElementById('prov-negocio').value = p.negocio;
        document.getElementById('prov-rif').value = p.rif;
        document.getElementById('prov-nombre').value = p.contacto.nombre;
        document.getElementById('prov-cedula').value = p.contacto.cedula;
        document.getElementById('prov-tel').value = p.contacto.tel;
        document.getElementById('prov-correo').value = p.contacto.correo;
        
        let precios = p.precios || { suave: 0, normal: 0, fuerte: 0 };
        document.getElementById('prov-precio-suave').value = precios.suave;
        document.getElementById('prov-precio-normal').value = precios.normal;
        document.getElementById('prov-precio-fuerte').value = precios.fuerte;
        
        document.getElementById('btn-prov').innerText = "Actualizar Datos";
        window.scrollTo(0, 0);
    }
}

document.getElementById('form-prov').addEventListener('submit', (e) => {
    e.preventDefault();
    let rif = document.getElementById('prov-rif').value.trim().toUpperCase();
    let negocio = document.getElementById('prov-negocio').value.trim();
    let tel = document.getElementById('prov-tel').value.trim();
    let cedula = document.getElementById('prov-cedula').value.trim();

    if (!esRIFValido(rif) || negocio === '' || isNaN(tel) || isNaN(cedula)) {
        return alert('Verifique los datos ingresados.');
    }

    let contacto = {
        nombre: document.getElementById('prov-nombre').value.trim(),
        cedula, tel, correo: document.getElementById('prov-correo').value.trim()
    };

    let precios = {
        suave: parseFloat(document.getElementById('prov-precio-suave').value) || 0,
        normal: parseFloat(document.getElementById('prov-precio-normal').value) || 0,
        fuerte: parseFloat(document.getElementById('prov-precio-fuerte').value) || 0
    };

    if (editMode.proveedores !== null) {
        let item = db.proveedores.find(i => i.id === editMode.proveedores);
        item.negocio = negocio; item.rif = rif; item.contacto = contacto; item.precios = precios;
        alert('Proveedor actualizado.');
    } else {
        db.proveedores.push({ id: Date.now(), negocio, rif, activo: true, contacto, precios });
        alert('Proveedor guardado.');
    }

    saveDB();
    document.getElementById('form-prov').reset();
    editMode.proveedores = null;
    document.getElementById('btn-prov').innerText = 'Guardar Proveedor';
    renderListaProveedores();
});