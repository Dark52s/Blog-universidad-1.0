var tasaDolar = 45.0; // Tasa fija en Bolívares para hacer los cálculos de venta rápida
var listaTransacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

// Precios por defecto (USD por kg) — se pueden sobrescribir desde el formulario
var preciosDefecto = { suave: 4.00, normal: 5.00, fuerte: 6.00 };

function actualizarListaNegocios() {
    var tipo = document.getElementById("tipo-op").value;
    var combo = document.getElementById("negocio-seleccionado");
    combo.innerHTML = "<option value=''>-- Seleccione --</option>";

    var datos = [];
    if (tipo == "Compra") {
        datos = JSON.parse(localStorage.getItem("proveedores")) || [];
    } else if (tipo == "Venta") {
        datos = JSON.parse(localStorage.getItem("clientes")) || [];
    }

    // Llenar el select solo con negocios ACTIVOS
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].activo == true) {
            combo.innerHTML += "<option value='" + datos[i].negocio + "'>" + datos[i].negocio + "</option>";
        }
    }
}

function procesarOperacion(evento) {
    evento.preventDefault();

    var tipo = document.getElementById("tipo-op").value;
    var kSuave = parseFloat(document.getElementById("kg-suave").value) || 0;
    var kNormal = parseFloat(document.getElementById("kg-normal").value) || 0;
    var kFuerte = parseFloat(document.getElementById("kg-fuerte").value) || 0;

    // Obtener precios desde los inputs (o usar valores por defecto)
    var precioSuave = parseFloat(document.getElementById("precio-suave").value) || preciosDefecto.suave;
    var precioNormal = parseFloat(document.getElementById("precio-normal").value) || preciosDefecto.normal;
    var precioFuerte = parseFloat(document.getElementById("precio-fuerte").value) || preciosDefecto.fuerte;

    // Calcular montos individuales según los precios configurados en $
    var totalUSD = (kSuave * precioSuave) + (kNormal * precioNormal) + (kFuerte * precioFuerte);
    var totalBs = totalUSD * tasaDolar;

    var textoMonto = "";
    if (tipo == "Compra") {
        textoMonto = "$" + totalUSD.toFixed(2); // Compras registradas en dólares
    } else {
        textoMonto = totalBs.toFixed(2) + " Bs."; // Ventas registradas en Bolívares
    }

    var nuevaOperacion = {
        fecha: document.getElementById("fecha-op").value,
        tipo: tipo,
        negocio: document.getElementById("negocio-seleccionado").value,
        detalle: "S: " + kSuave + "kg | N: " + kNormal + "kg | F: " + kFuerte + "kg",
        monto: textoMonto,
        valorNumericoUSD: totalUSD,
        valorNumericoBs: totalBs
    };

    listaTransacciones.push(nuevaOperacion);
    localStorage.setItem("transacciones", JSON.stringify(listaTransacciones));
    
    location.reload(); // Recargar para limpiar y refrescar el historial rápido
}

function guardarPrecios() {
    var pSuave = parseFloat(document.getElementById("precio-suave").value) || preciosDefecto.suave;
    var pNormal = parseFloat(document.getElementById("precio-normal").value) || preciosDefecto.normal;
    var pFuerte = parseFloat(document.getElementById("precio-fuerte").value) || preciosDefecto.fuerte;

    var precios = { suave: pSuave, normal: pNormal, fuerte: pFuerte };
    localStorage.setItem("preciosCafe", JSON.stringify(precios));
    alert("Precios guardados.");
}

function cargarPrecios() {
    var guardados = JSON.parse(localStorage.getItem("preciosCafe")) || null;
    if (guardados) {
        document.getElementById("precio-suave").value = guardados.suave;
        document.getElementById("precio-normal").value = guardados.normal;
        document.getElementById("precio-fuerte").value = guardados.fuerte;
    } else {
        document.getElementById("precio-suave").value = preciosDefecto.suave;
        document.getElementById("precio-normal").value = preciosDefecto.normal;
        document.getElementById("precio-fuerte").value = preciosDefecto.fuerte;
    }
}

function mostrarHistorial() {
    var tbody = document.getElementById("historial-tabla");
    tbody.innerHTML = "";

    // Mostrar desde la última a la primera transacción
    for (var i = listaTransacciones.length - 1; i >= 0; i--) {
        var t = listaTransacciones[i];
        tbody.innerHTML += "<tr>" +
            "<td>" + t.fecha + "</td>" +
            "<td>" + t.tipo + "</td>" +
            "<td>" + t.negocio + "</td>" +
            "<td>" + t.detalle + "</td>" +
            "<td><strong>" + t.monto + "</strong></td>" +
        "</tr>";
    }
}

cargarPrecios();
mostrarHistorial();