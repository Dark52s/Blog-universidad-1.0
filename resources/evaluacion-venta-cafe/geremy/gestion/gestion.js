var tasaDolar = 45.0;
var listaTransacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
var preciosDefecto = { suave: 4.00, normal: 5.00, fuerte: 6.00 };

export function actualizarListaNegocios() {
    var tipo = document.getElementById("tipo-op").value;
    var combo = document.getElementById("negocio-seleccionado");
    combo.innerHTML = "<option value=''>-- Seleccione --</option>";
    var datos = [];
    if (tipo == "Compra") {
        datos = JSON.parse(localStorage.getItem("proveedores")) || [];
    } else if (tipo == "Venta") {
        datos = JSON.parse(localStorage.getItem("clientes")) || [];
    }
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].activo == true) {
            combo.innerHTML += "<option value='" + datos[i].negocio + "'>" + datos[i].negocio + "</option>";
        }
    }
}

export function procesarOperacion(evento) {
    evento.preventDefault();
    var tipo = document.getElementById("tipo-op").value;
    var kSuave = parseFloat(document.getElementById("kg-suave").value) || 0;
    var kNormal = parseFloat(document.getElementById("kg-normal").value) || 0;
    var kFuerte = parseFloat(document.getElementById("kg-fuerte").value) || 0;
    var precioSuave = parseFloat(document.getElementById("precio-suave").value) || preciosDefecto.suave;
    var precioNormal = parseFloat(document.getElementById("precio-normal").value) || preciosDefecto.normal;
    var precioFuerte = parseFloat(document.getElementById("precio-fuerte").value) || preciosDefecto.fuerte;
    var totalUSD = (kSuave * precioSuave) + (kNormal * precioNormal) + (kFuerte * precioFuerte);
    var totalBs = totalUSD * tasaDolar;
    var textoMonto = "";
    if (tipo == "Compra") {
        textoMonto = "$" + totalUSD.toFixed(2);
    } else {
        textoMonto = totalBs.toFixed(2) + " Bs.";
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
    location.reload();
}

export function guardarPrecios() {
    var pSuave = parseFloat(document.getElementById("precio-suave").value) || preciosDefecto.suave;
    var pNormal = parseFloat(document.getElementById("precio-normal").value) || preciosDefecto.normal;
    var pFuerte = parseFloat(document.getElementById("precio-fuerte").value) || preciosDefecto.fuerte;
    var precios = { suave: pSuave, normal: pNormal, fuerte: pFuerte };
    localStorage.setItem("preciosCafe", JSON.stringify(precios));
    alert("Precios guardados.");
}

export function cargarPrecios() {
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

export function mostrarHistorial() {
    var tbody = document.getElementById("historial-tabla");
    tbody.innerHTML = "";
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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-gestion")?.addEventListener("submit", procesarOperacion);
    document.getElementById("tipo-op")?.addEventListener("change", actualizarListaNegocios);
    document.getElementById("btn-guardar-precios")?.addEventListener("click", guardarPrecios);
    cargarPrecios();
    mostrarHistorial();
});
