/*
    ESTO ES UN ARCHIVO .js POR FAVOR CAMBIAR LA EXTENSION DEL ARCHIVO A .js
*/

const listaEstudiantes = [
    { nombre: "Ana", apellido: "Ramos", cedula: "3265895", nota1: "78", nota2: "85", nota3: "92", nota4: "88", promedio: "85.75", aprobado: "Aprobado" },
    { nombre: "Mario", apellido: "López", cedula: "19564513", nota1: "64", nota2: "70", nota3: "58", nota4: "73", promedio: "66.25", aprobado: "Aprobado" },
    { nombre: "Sofía", apellido: "García", cedula: "40555555", nota1: "95", nota2: "90", nota3: "93", nota4: "97", promedio: "93.75", aprobado: "Aprobado" },
    { nombre: "Diego", apellido: "Pérez", cedula: "67677676", nota1: "55", nota2: "62", nota3: "48", nota4: "60", promedio: "56.25", aprobado: "Reprobado" },
    { nombre: "Laura", apellido: "Suárez", cedula: "1505161", nota1: "82", nota2: "79", nota3: "88", nota4: "91", promedio: "85.00", aprobado: "Aprobado" },
    { nombre: "Carlos", apellido: "Mejía", cedula: "10023236", nota1: "69", nota2: "71", nota3: "67", nota4: "74", promedio: "70.25", aprobado: "Aprobado" },
    { nombre: "Mariana", apellido: "Duarte", cedula: "32198407", nota1: "88", nota2: "85", nota3: "90", nota4: "87", promedio: "87.50", aprobado: "Aprobado" }
]

// Obiene referencia de la tabla
let tabla = document.getElementById("tablaEstudiantes");

let tbody = document.querySelector("#tablaEstudiantes tbody");

// Render inicial
renderTable();



// Obtiene referencia del formulario
const formEstudiantes = document.getElementById("formEstudiantes");
formEstudiantes.addEventListener("submit", (event) => {
    event.preventDefault(); // Detiene el comportamiento habitual a enviar el formulario


    // Obtiene la entrada del nuevo estudiante y lo convierte a un objeto 
    let nuevoEstudiante = Object.fromEntries(new FormData(formEstudiantes));

    if (listaEstudiantes.some(est => est.cedula === nuevoEstudiante.cedula)) {
        alert("Ya existe un estudiante con esa cedula");
        return;
    }

    // Promedio de notas
    nuevoEstudiante.promedio = promediar([nuevoEstudiante.nota1, nuevoEstudiante.nota2, nuevoEstudiante.nota3, nuevoEstudiante.nota4]); 

    nuevoEstudiante.aprobado = nuevoEstudiante.promedio >= 65 ? "Aprobado" : "Reprobado";

    // Guarda informacion del nuevo estudiante en un arreglo
    listaEstudiantes.push(nuevoEstudiante); 

    // Volvemos a renderizar la tabla y actualizar contadores
    renderTable();

    formEstudiantes.reset(); // Resetea el formulario
});

function promediar(notas = [nota1, nota2, nota3, nota4]) {
    for (let i in notas){
        notas[i] = parseInt(notas[i]); 
    }
    return (notas[0] + notas[1] + notas[2] + notas[3]) / notas.length
}

function renderTable() {
    // Limpia la tabla
    tbody.innerHTML = "";
    let numAprobados = 0;

    // Se insertan todos los estudiantes hasta ahora
    for (let estudiante of listaEstudiantes) {
        let fila = tbody.insertRow();
        if (estudiante.aprobado === "Aprobado") numAprobados++;
        for (let valor of Object.values(estudiante)) {
            fila.insertCell().textContent = valor;
        }
    }

    // Actualiza contadores de aprobados y reprobados
    let refAprobados = document.getElementById("aprobados");
    if (refAprobados) refAprobados.textContent = numAprobados;

    let refReprobados = document.getElementById("reprobados");
    if (refReprobados) refReprobados.textContent = listaEstudiantes.length - numAprobados;
}