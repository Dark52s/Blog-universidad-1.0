const readline = require('node:readline/promises');
const { stdin: entrada, stdout: salida } = require('node:process');

const rl = readline.createInterface({ input: entrada, output: salida });

async function calcularNotas() {
  // Arreglos
  const estudiantes = [];
  const aprobados = [];
  const reprobados = [];

  console.log("=== INGRESO DE NOTAS (7 ESTUDIANTES) ===");

  // Bucle for
  for (let i = 0; i < 7; i++) {
    let nombre = await rl.question(`\nNombre del estudiante ${i + 1}: `);
    
    // Pedir las notas
    let n1 = parseFloat(await rl.question(`  Nota 1: `));
    let n2 = parseFloat(await rl.question(`  Nota 2: `));
    let n3 = parseFloat(await rl.question(`  Nota 3: `));
    let n4 = parseFloat(await rl.question(`  Nota 4: `));

    let promedio = (n1 + n2 + n3 + n4) / 4;

    //Crear un objeto
    let estudiante = {
      nombre: nombre,
      nota1: n1,
      nota2: n2,
      nota3: n3,
      nota4: n4,
      promedio: promedio
    };

    // Guardar el estudiante en el arreglo
    estudiantes.push(estudiante);

    // Condicional, solo se guarda la variable nombre del estudiante en el arreglo de aprobados o reprobados
    if (promedio >= 10) {
      aprobados.push(nombre);
    } else {
      reprobados.push(nombre);
    }
  }

  // Salida de datos
  console.log("\n=== HOJA DE CÁLCULO: RESULTADOS ===");
  // imprime los datos del arreglo estudiantes en una tabla
  console.table(estudiantes); 
  console.log("Aprobados (" + aprobados.length + "): " + aprobados);
  console.log("Reprobados (" + reprobados.length + "): " + reprobados);
  rl.close();
}

calcularNotas();