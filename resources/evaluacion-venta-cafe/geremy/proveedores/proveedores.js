// Cargar lista o crear una vacía si no existe
var listaProvs = JSON.parse(localStorage.getItem("proveedores")) || [];

function mostrarTabla() {
    var tbody = document.getElementById("lista-proveedores");
    tbody.innerHTML = ""; // Limpiar tabla

    for (var i = 0; i < listaProvs.length; i++) {
        var p = listaProvs[i];
        
        // Ver si está activo o inactivo
        var estadoTexto = "Activo";
        if (p.activo == false) {
            estadoTexto = "Inactivo";
        }

        tbody.innerHTML += "<tr>" +
            "<td>" + p.negocio + "</td>" +
            "<td>" + p.rif + "</td>" +
            "<td>" + p.nombre + " (" + p.telefono + ")</td>" +
            "<td>" + estadoTexto + "</td>" +
            "<td>" +
                "<button onclick='editar(" + i + ")'>Modificar</button> " +
                "<button onclick='cambiarEstado(" + i + ")'>Desactivar/Activar</button>" +
            "</td>" +
        "</tr>";
    }
}

function guardarProveedor(evento) {
    evento.preventDefault();
    var id = document.getElementById("id-editar").value;

    if (id == "") {
        // ES NUEVO
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
        // ES UNA EDICIÓN (Solo los campos de contacto según la regla de la evaluación)
        listaProvs[id].nombre = document.getElementById("nombre").value;
        listaProvs[id].cedula = document.getElementById("cedula").value;
        listaProvs[id].telefono = document.getElementById("telefono").value;
        listaProvs[id].correo = document.getElementById("correo").value;
    }

    localStorage.setItem("proveedores", JSON.stringify(listaProvs));
    
    // Limpiar formulario y desbloquear
    document.getElementById("formulario").reset();
    document.getElementById("id-editar").value = "";
    document.getElementById("negocio").disabled = false;
    document.getElementById("rif").disabled = false;
    
    mostrarTabla();
}

function editar(id) {
    document.getElementById("id-editar").value = id;
    
    // Cargar datos
    document.getElementById("negocio").value = listaProvs[id].negocio;
    document.getElementById("rif").value = listaProvs[id].rif;
    document.getElementById("nombre").value = listaProvs[id].nombre;
    document.getElementById("cedula").value = listaProvs[id].cedula;
    document.getElementById("telefono").value = listaProvs[id].telefono;
    document.getElementById("correo").value = listaProvs[id].correo;

    // Bloquear negocio y RIF para que no se puedan modificar
    document.getElementById("negocio").disabled = true;
    document.getElementById("rif").disabled = true;
}

function cambiarEstado(id) {
    // Si estaba true pasa a false, si estaba false pasa a true
    listaProvs[id].activo = !listaProvs[id].activo;
    localStorage.setItem("proveedores", JSON.stringify(listaProvs));
    mostrarTabla();
}

// Iniciar cargando la tabla
mostrarTabla();