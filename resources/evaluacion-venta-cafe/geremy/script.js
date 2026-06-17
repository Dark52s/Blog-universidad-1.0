function entrar() {
    var u = document.getElementById("usuario").value;
    var c = document.getElementById("clave").value;

    if (u == "admin" && c == "1234") {
        localStorage.setItem("login", "si");
        revisarSesion();
    } else {
        document.getElementById("mensaje-error").innerText = "Usuario o clave incorrecta";
    }
}

function salir() {
    localStorage.removeItem("login");
    location.reload();
}

function revisarSesion() {
    if (localStorage.getItem("login") == "si") {
        document.getElementById("caja-login").classList.add("oculto");
        document.getElementById("caja-menu").classList.remove("oculto");
    }
}

// Ejecutar al cargar la página
revisarSesion();function entrar() {
    var u = document.getElementById("usuario").value;
    var c = document.getElementById("clave").value;

    if (u == "admin" && c == "1234") {
        localStorage.setItem("login", "si");
        revisarSesion();
    } else {
        document.getElementById("mensaje-error").innerText = "Usuario o clave incorrecta";
    }
}

function salir() {
    localStorage.removeItem("login");
    location.reload();
}

function revisarSesion() {
    if (localStorage.getItem("login") == "si") {
        document.getElementById("caja-login").classList.add("oculto");
        document.getElementById("caja-menu").classList.remove("oculto");
    }
}

// Ejecutar al cargar la página
revisarSesion();