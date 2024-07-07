// Declarar variables y objetos 
let peso;
let edad;
let nivelActividad;
let registros = [];  // Array para almacenar registros de cálculos

// Objeto para representar un registro de cálculo
class RegistroCalculo {
    constructor(peso, edad, nivelActividad, caloriasTotales) {
        this.peso = peso;
        this.edad = edad;
        this.nivelActividad = nivelActividad;
        this.caloriasTotales = caloriasTotales;
    }
}

// Función para calcular las calorías base según el peso y ajustar según la edad
function calcularRequerimientoCalorico(peso, edad) {
    let caloriasBase = peso * 23;

    if (edad < 18) {
        caloriasBase += 300;
    } else if (edad >= 18 && edad <= 45) {
        // No hay cambio
    } else if (edad >= 46 && edad <= 55) {
        caloriasBase -= 100;
    } else if (edad >= 56 && edad <= 65) {
        caloriasBase -= 200;
    } else if (edad >= 66 && edad <= 75) {
        caloriasBase -= 300;
    }

    return caloriasBase;
}

// Calcular las calorías totales ajustadas según el nivel de actividad física
function calcularRequerimientoTotal(peso, edad, nivelActividad) {
    let caloriasBase = calcularRequerimientoCalorico(peso, edad);

    let ajusteActividad = 0;
    switch (nivelActividad.toLowerCase()) {
        case 'nula':
            ajusteActividad = 0;
            break;
        case 'leve':
            ajusteActividad = 100;
            break;
        case 'moderada':
            ajusteActividad = 200;
            break;
        case 'elevada':
            ajusteActividad = 300;
            break;
        default:
            alert("Nivel de actividad no válido. Por favor ingrese 'nula', 'leve', 'moderada' o 'elevada'.");
            return null;
    }

    let caloriasTotales = caloriasBase + ajusteActividad;
    return caloriasTotales;
}

// Solicitar datos y calcular el requerimiento calórico
function iniciarCalculo() {
    let continuar = true;

    while (continuar) {
        // Solicitar y validar la entrada para el peso
        peso = parseFloat(prompt('Ingresa tu peso en kilogramos:'));
        if (isNaN(peso) || peso <= 0) {
            alert("Por favor, ingresa un peso válido en kilogramos.");
            continue;
        }

        // Solicitar y validar la entrada para la edad
        edad = parseInt(prompt("Ingresa tu edad en años:"));
        if (isNaN(edad) || edad <= 0) {
            alert("Por favor, ingresa una edad válida.");
            continue;
        }

        // Solicitar y validar la entrada para el nivel de actividad física
        nivelActividad = prompt("Ingresa tu nivel de actividad física (nula, leve, moderada, elevada):");
        if (!nivelActividad || !['nula', 'leve', 'moderada', 'elevada'].includes(nivelActividad.toLowerCase())) {
            alert("Por favor, ingresa un nivel de actividad válido (nula, leve, moderada, elevada).");
            continue;
        }

        // Calcular y mostrar el requerimiento calórico
        let caloriasTotales = calcularRequerimientoTotal(peso, edad, nivelActividad);

        if (caloriasTotales !== null) {
            alert("Tu requerimiento calórico total es: " + caloriasTotales + " kcal");
            console.log(`Peso: ${peso} kg, Edad: ${edad} años, Nivel de Actividad: ${nivelActividad}, Calorías Totales: ${caloriasTotales} kcal`);

            // Crear un nuevo registro y añadirlo al array de registros
            let nuevoRegistro = new RegistroCalculo(peso, edad, nivelActividad, caloriasTotales);
            registros.push(nuevoRegistro);
        }

        // Preguntar si desea volver a calcular
        continuar = confirm("¿Deseas calcular de nuevo?");
    }

    // Mostrar todos los registros al finalizar
    console.log("Registros de cálculos:");
    registros.forEach(registro => {
        console.log(`Peso: ${registro.peso} kg, Edad: ${registro.edad} años, Nivel de Actividad: ${registro.nivelActividad}, Calorías Totales: ${registro.caloriasTotales} kcal`);
    });
}

// Iniciar el cálculo cuando se carga la página
iniciarCalculo();
