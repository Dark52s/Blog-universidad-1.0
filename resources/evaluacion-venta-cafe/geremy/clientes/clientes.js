var listaClis = JSON.parse(localStorage.getItem("clientes")) || [];

function mostrarTabla() {
    var tbody = document.getElementById("lista-clientes");
    tbody.innerHTML = "";

    for (var i = 0; i < listaClis.length; i++) {
        var c = listaClis[i];
        var estadoTexto = c.activo ? "Activo" : "Inactivo";

        tbody.innerHTML += "<tr>" +
            "<td>" + c.negocio + "</td>" +
            "<td>" + c.rif + "</td>" +
            "<td>" + c.nombre + " (" + c.telefono + ")</td>" +
            "<td>" + estadoTexto + "</td>" +
            "<td>" +
                "<button onclick='editar(" + i + ")'>Modificar</button> " +
                "<button onclick='cambiarEstado(" + i + ")'>Desactivar/Activar</button>" +
            "</td>" +
        "</tr>";
    }
}

function guardarCliente(evento) {
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
        listaClis.push(nuevo);
    } else {
        listaClis[id].nombre = document.getElementById("nombre").value;
        listaClis[id].cedula = document.getElementById("cedula").value;
        listaClis[id].telefono = document.getElementById("telefono").value;
        listaClis[id].correo = document.getElementById("correo").value;
    }

    localStorage.setItem("clientes", JSON.stringify(listaClis));
    
    document.getElementById("formulario").reset();
    document.getElementById("id-editar").value = "";
    document.getElementById("negocio").disabled = false;
    document.getElementById("rif").disabled = false;
    
    mostrarTabla();
}

function editar(id) {
    document.getElementById("id-editar").value = id;
    document.getElementById("negocio").value = listaClis[id].negocio;
    document.getElementById("rif").value = listaClis[id].rif;
    document.getElementById("nombre").value = listaClis[id].nombre;
    document.getElementById("cedula").value = listaClis[id].cedula;
    document.getElementById("telefono").value = listaClis[id].telefono;
    document.getElementById("correo").value = listaClis[id].correo;

    document.getElementById("negocio").disabled = true;
    document.getElementById("rif").disabled = true;
}

function cambiarEstado(id) {
    listaClis[id].activo = !listaClis[id].activo;
    localStorage.setItem("clientes", JSON.stringify(listaClis));
    mostrarTabla();
}

mostrarTabla();