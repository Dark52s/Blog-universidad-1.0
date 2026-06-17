function toggleTransType() {
    let tipo = document.getElementById('trans-tipo').value;
    let select = document.getElementById('trans-entidad');
    document.getElementById('moneda-lbl').innerText = 'USD';
    
    select.innerHTML = '<option value="">Seleccione Negocio...</option>';
    if (tipo === '') return;

    let lista = tipo === 'compra' ? db.proveedores : db.clientes;
    lista.forEach(e => {
        if (e.activo) {
            select.innerHTML += `<option value="${e.id}">${e.negocio} (${e.rif})</option>`;
        }
    });
    actualizarPreciosVenta();
}

function cargarEntidades() {
    toggleTransType();
    recalcularMontos();
}

function actualizarPreciosVenta() {
    let tipo = document.getElementById('trans-tipo').value;
    let id = document.getElementById('trans-entidad').value;
    
    let inputs = [document.getElementById('precio-suave'), document.getElementById('precio-normal'), document.getElementById('precio-fuerte')];
    
    if (tipo === 'compra' && id !== '') {
        let prov = db.proveedores.find(p => p.id == id);
        if (prov) {
            let p = prov.precios || { suave: 0, normal: 0, fuerte: 0 };
            inputs[0].value = p.suave;
            inputs[1].value = p.normal;
            inputs[2].value = p.fuerte;
            inputs.forEach(i => i.disabled = true);
        }
    } else {
        inputs.forEach(i => {
            i.disabled = false;
            if (i.value === '') i.value = 0;
        });
    }
    recalcularMontos();
}

function recalcularMontos() {
    let totalUSD = 0;
    ['suave', 'normal', 'fuerte'].forEach(t => {
        let kg = parseFloat(document.getElementById(`kg-${t}`).value) || 0;
        let precio = parseFloat(document.getElementById(`precio-${t}`).value) || 0;
        if (kg > 0 && precio > 0) totalUSD += (kg * precio);
    });
    
    let totalVES = totalUSD * db.config.tasa;
    document.getElementById('total-ves').innerText = `Total: ${totalVES.toFixed(2)} VES`;
    document.getElementById('total-usd').innerText = `(${totalUSD.toFixed(2)} USD - Tasa: ${db.config.tasa})`;
    return { usd: totalUSD, ves: totalVES };
}

document.getElementById('form-trans').addEventListener('input', recalcularMontos);

document.getElementById('form-trans').addEventListener('submit', (e) => {
    e.preventDefault();
    let tipo = document.getElementById('trans-tipo').value;
    let entidadId = document.getElementById('trans-entidad').value;
    
    if (tipo === '' || entidadId === '') return alert('Seleccione operación y negocio.');

    let datosValidos = true, detalles = {};
    ['suave', 'normal', 'fuerte'].forEach(t => {
        let kgStr = document.getElementById(`kg-${t}`).value;
        let precioStr = document.getElementById(`precio-${t}`).value;
        if (!validarNumero(kgStr) || !validarNumero(precioStr)) datosValidos = false;
        else detalles[t] = { kg: parseFloat(kgStr), precio: parseFloat(precioStr) };
    });

    let montos = recalcularMontos();
    if (!datosValidos || montos.usd <= 0) return alert('Verifique kilos y precios.');

    if (tipo === 'venta') {
        let inv = obtenerInventarioActual();
        if (detalles.suave.kg > inv.suave || detalles.normal.kg > inv.normal || detalles.fuerte.kg > inv.fuerte) {
            return alert('Inventario insuficiente para esta venta.');
        }
    }

    db.transacciones.push({
        id: Date.now(), tipo, entidadId,
        fecha: document.getElementById('trans-fecha').value,
        detalle: detalles, totalUSD: montos.usd, totalVES: montos.ves,
        estado: tipo === 'venta' ? 'Por Cobrar' : 'Pagado'
    });

    saveDB(); e.target.reset(); recalcularMontos(); alert('Transacción procesada.');
});