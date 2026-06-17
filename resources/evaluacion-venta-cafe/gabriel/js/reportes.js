function generarReporte(tipoReporte) {
    const divPanel = document.getElementById('resultado-reporte'); 
    divPanel.innerHTML = ''; 
    
    if (tipoReporte === 'ganancias') {
        let ventasVES = 0, ventasUSD = 0;
        db.transacciones.filter(t => t.tipo === 'venta').forEach(v => { ventasVES += v.totalVES; ventasUSD += v.totalUSD; });

        let comprasVES = 0, comprasUSD = 0;
        db.transacciones.filter(t => t.tipo === 'compra').forEach(c => { comprasVES += c.totalVES; comprasUSD += c.totalUSD; });

        divPanel.innerHTML = `
            <h3>Totales Históricos</h3>
            <p><strong>Ventas Totales:</strong> ${ventasVES.toFixed(2)} VES <em>(${ventasUSD.toFixed(2)} USD)</em></p>
            <p><strong>Compras Totales:</strong> ${comprasVES.toFixed(2)} VES <em>(${comprasUSD.toFixed(2)} USD)</em></p>
        `;
    }
    
    if (tipoReporte === 'cobrar') {
        let listaDeudas = db.transacciones.filter(t => t.tipo === 'venta' && t.estado === 'Por Cobrar');
        let htmlLista = `<h3>Cuentas por Cobrar</h3><ul>`;
        
        if (listaDeudas.length === 0) htmlLista += `<li>No hay deudas pendientes.</li>`;

        listaDeudas.forEach(deuda => {
            let cliente = db.clientes.find(c => c.id == deuda.entidadId);
            let nombreCliente = cliente ? cliente.negocio : 'Cliente Desconocido';
            htmlLista += `<li>${nombreCliente} - ${deuda.totalVES.toFixed(2)} VES <em>(${deuda.totalUSD.toFixed(2)} USD)</em> - Fecha: ${deuda.fecha}</li>`;
        });
        divPanel.innerHTML = htmlLista + `</ul>`;
    }
            
    if (tipoReporte === 'inventario') {
        let inventario = obtenerInventarioActual();
        divPanel.innerHTML = `
            <h3>Stock Actual</h3>
            <p>Suave: ${inventario.suave} Kg</p>
            <p>Normal: ${inventario.normal} Kg</p>
            <p>Fuerte: ${inventario.fuerte} Kg</p>
        `;
    }
}