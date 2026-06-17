var listaProvs = JSON.parse(localStorage.getItem("proveedores")) || [];

export function mostrarTabla() {
    var tbody = document.getElementById("lista-proveedores");
    tbody.innerHTML = "";
    for (var i = 0; i < listaProvs.length; i++) {
        var p = listaProvs[i];
        var estadoTexto = p.activo ? "Activo" : "Inactivo";
        tbody.innerHTML += "<tr>" +
            "<td>" + p.negocio + "</td>" +
            "<td>" + p.rif + "</td>" +
            "<td>" + p.nombre + " (" + p.telefono + ")</td>" +
            "<td>" + estadoTexto + "</td>" +
            "<td>" +
                "<button data-action='editar-prov' data-index='" + i + "'>Modificar</button> " +
                "<button data-action='cambiar-estado-prov' data-index='" + i + "'>Desactivar/Activar</button>" +
            "</td>" +
        "</tr>";
    }
}

export function guardarProveedor(evento) {
    evento.preventDefault();
    var id = document.getElementById("id-editar").value;
    if (id == "") {
        var nuevo = {
            negocio: document.getElementById("negocio").value,
            rif: document.getElementById("rif").value,
            nombre: document.getElementById("nombre").value,
            cedula: document.getElementById("cedula").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            activo: true
        };
        listaProvs.push(nuevo);
    } else {
        listaProvs[id].nombre = document.getElementById("nombre").value;
        listaProvs[id].cedula = document.getElementById("cedula").value;
        listaProvs[id].telefono = document.getElementById("telefono").value;
        listaProvs[id].correo = document.getElementById("correo").value;
    }
    localStorage.setItem("proveedores", JSON.stringify(listaProvs));
    document.getElementById("formulario").reset();
    document.getElementById("id-editar").value = "";
    document.getElementById("negocio").disabled = false;
    document.getElementById("rif").disabled = false;
    mostrarTabla();
}

export function editarProveedor(id) {
    document.getElementById("id-editar").value = id;
    document.getElementById("negocio").value = listaProvs[id].negocio;
    document.getElementById("rif").value = listaProvs[id].rif;
    document.getElementById("nombre").value = listaProvs[id].nombre;
    document.getElementById("cedula").value = listaProvs[id].cedula;
    document.getElementById("telefono").value = listaProvs[id].telefono;
    document.getElementById("correo").value = listaProvs[id].correo;
    document.getElementById("negocio").disabled = true;
    document.getElementById("rif").disabled = true;
}

export function cambiarEstadoProveedor(id) {
    listaProvs[id].activo = !listaProvs[id].activo;
    localStorage.setItem("proveedores", JSON.stringify(listaProvs));
    mostrarTabla();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formulario")?.addEventListener("submit", guardarProveedor);
    document.getElementById("lista-proveedores")?.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        var idx = parseInt(btn.dataset.index);
        if (btn.dataset.action === "editar-prov") editarProveedor(idx);
        if (btn.dataset.action === "cambiar-estado-prov") cambiarEstadoProveedor(idx);
    });
    mostrarTabla();
});
