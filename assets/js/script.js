// Variables
let capitalInicial = 5000; // Puedes establecer el capital inicial deseado.

// Funciones
function iniciarJuego() {
    $('#nombreModal').modal('show');
}

function iniciarJuegoModal() {
    const nombre = document.getElementById("nombreInput").value;
    if (nombre) {
        document.getElementById("mensajeCapital").style.display = "block";
        document.getElementById("segundoDiv").classList.add("aparecer");
        const mensaje = `Hola ${nombre}, comenzarás con un capital inicial de ${capitalInicial.toFixed(2)} soles, y la toma de decisiones estratégicas será la clave para alcanzar tus objetivos. ¿Estás listo para poner a prueba tus habilidades empresariales y prosperar en el mundo de los negocios?`;
        document.getElementById("mensajeCapital").textContent = mensaje;
        document.getElementById("siBtn").style.display = "block";
        document.getElementById("noBtn").style.display = "block";
        document.getElementById("comenzarBtn").style.display = "none"; // Ocultar el botón "Comenzar"
        $('#nombreModal').modal('hide');
    }
}

function empezarJuego() {
    // Mostrar el capital inicial después de presionar "SI"
    document.getElementById("siBtn").style.display = "none";
    document.getElementById("noBtn").style.display = "none"; // Ocultar el botón "NO"
    mostrarCapitalInicial();
    // Mostrar la opción de solicitar préstamo y la sección de gestión de préstamo
    document.getElementById("loanSection").style.display = "block";
   // document.getElementById("loanDetails").style.display = "block";
    // Obtener el valor del capital inicial y mostrarlo en la sección "Plazo del Préstamo"
    const capitalMessage = capitalInicial.toFixed(2);
    document.getElementById("montoCapitalLabel").textContent = capitalMessage;
    document.getElementById("compraMateriaPrimaBtn").style.display = "block";

}

function mostrarCapitalInicial() {
    // Mostrar el mensaje "Capital Inicial: 5000.00 soles" en el tercer div
    const capitalMessage = `Capital Inicial: ${capitalInicial.toFixed(2)} soles`;
    document.getElementById("capitalInicialMessage").textContent = capitalMessage;
 

    // Mostrar el tercer div
    document.getElementById("tercerDiv").style.display = "block";

    // Continuar con la lógica del juego si es necesario
    alert("¡Adelante y comencemos a construir tu imperio!");
}

function reiniciarJuego() {
    // Reiniciar el juego
    document.getElementById("segundoDiv").classList.remove("aparecer");
    setTimeout(() => {
        document.getElementById("mensajeCapital").style.display = "none";
        document.getElementById("siBtn").style.display = "none";
        document.getElementById("noBtn").style.display = "none";

        // Ocultar el capital inicial
        document.getElementById("capitalInicial").style.display = "none";

        // Mostrar nuevamente el botón "Comenzar"
        document.getElementById("comenzarBtn").style.display = "block";
    }, 1000); // Agregar un retraso de 1 segundo antes de ocultar los elementos (puedes ajustar este valor)
}

function solicitarPrestamo() {
    const montoPrestamo = parseFloat(document.getElementById("loanAmount").value);
    const plazoPrestamo = parseInt(document.getElementById("loanTerm").value);
    const tasaInteres = 0.1; // Tasa de interés del 10% (puedes ajustarla)

    const cuotaMensual = calcularCuotaMensual(montoPrestamo, plazoPrestamo, tasaInteres);
    //const nuevoCapital = capitalInicial + montoPrestamo;
    const nuevoCapital = montoPrestamo;

    // Actualizar el mensaje
    const resumenPrestamo = `Has solicitado un préstamo de ${montoPrestamo}.00 soles a una tasa de interés del 10% a pagar en ${plazoPrestamo} meses. Tu cuota mensual será de ${cuotaMensual} soles.`;
    document.getElementById("loanSummaryMessage").textContent = resumenPrestamo;

    // Mostrar un mensaje de aprobación modal
    $('#aprobacionModal').modal('show');

    // Bloquear la opción de solicitud de préstamo
    document.getElementById("loanAmount").disabled = true;
    document.getElementById("loanTerm").disabled = true;
    document.getElementById("solicitarPrestamoBtn").disabled = true;
    document.getElementById("noSolicitarPrestamoBtn").disabled = true;

    // Actualizar el capital
   // capitalInicial = nuevoCapital;
    document.getElementById("capitalInicialMessage").textContent = `Capital Inicial: ${capitalInicial.toFixed(2)} soles`;
    
    // Obtener el valor del préstamo y mostrarlo en la sección "Monto del Préstamo"
    document.getElementById("montoPrestamoLabel").textContent = montoPrestamo.toFixed(2);


}

function calcularCuotaMensual(montoPrestamo, plazoPrestamo, tasaInteres) {
    const tasaMensual = tasaInteres / 12;
    const cuota = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoPrestamo));
    return cuota.toFixed(2);
}



function noSolicitarPrestamo() {

    const resumeSection = document.getElementById("portfolio");
    if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: "smooth" });
    }
    // Bloquear la opción de solicitud de préstamo
    document.getElementById("loanAmount").disabled = true;
    document.getElementById("loanTerm").disabled = true;
    document.getElementById("solicitarPrestamoBtn").disabled = true;
    document.getElementById("noSolicitarPrestamoBtn").disabled = true;

}

// Continuar a la sección gestión de prestamo
function scrollToResume() {
    const resumeSection = document.getElementById("resume");
    if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: "smooth" });
    }
}
function scrollTomateria() {
    const MateriaSection = document.getElementById("portfolio");
    if (MateriaSection) {
        MateriaSection.scrollIntoView({ behavior: "smooth" });
    }
}

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// compra de materia prima -->



let saldo = 5000; // Saldo inicial del jugador
let acumulado = {
    totalCosto: 0,
    materiaPrima: {}
};

function agregarMateriaPrima() {
    const materiaPrimaSelect = document.getElementById("materiaPrimaSelect");
    const materiaPrimaId = materiaPrimaSelect.value;
    let materiaPrimaNombre = "";
    let materiaPrimaCosto = 0;

    switch (materiaPrimaId) {
        case "1":
            materiaPrimaNombre = "Plástico";
            materiaPrimaCosto = 200;
            break;
        case "2":
            materiaPrimaNombre = "Madera";
            materiaPrimaCosto = 400;
            break;
        case "3":
            materiaPrimaNombre = "Metal";
            materiaPrimaCosto = 600;
            break;
    }

    if (acumulado.materiaPrima[materiaPrimaId]) {
        acumulado.materiaPrima[materiaPrimaId].cantidad++;
    } else {
        acumulado.materiaPrima[materiaPrimaId] = {
            nombre: materiaPrimaNombre,
            costo: materiaPrimaCosto,
            cantidad: 1
        };
    }

    acumulado.totalCosto += materiaPrimaCosto;

    const tablaMateriaPrima = document.getElementById("tablaMateriaPrima").getElementsByTagName('tbody')[0];
    tablaMateriaPrima.innerHTML = "";
    for (const mpId in acumulado.materiaPrima) {
        const mp = acumulado.materiaPrima[mpId];
        const fila = tablaMateriaPrima.insertRow();
        const celdaNombre = fila.insertCell(0);
        const celdaCosto = fila.insertCell(1);
        const celdaCantidad = fila.insertCell(2);
        const celdaCostoTotal = fila.insertCell(3); // Nueva celda para el costo total por cantidad
        celdaNombre.innerHTML = mp.nombre;
        celdaCosto.innerHTML = mp.costo;
        celdaCantidad.innerHTML = mp.cantidad;
        celdaCostoTotal.innerHTML = (mp.costo * mp.cantidad).toFixed(2); // Cálculo del costo total por cantidad
    }

    // Mostrar la fila de acumulado
    const acumuladoRow = document.getElementById("acumuladoRow");
    acumuladoRow.style.display = "block";

    // Actualizar el saldo
    saldo -= materiaPrimaCosto;
    document.getElementById("saldoActual").textContent = saldo.toFixed(2) + " soles";

    // Actualizar el costo total
    document.getElementById("cantidadTotal").textContent = calcularCantidadTotal();
    document.getElementById("costoTotal").textContent = acumulado.totalCosto.toFixed(2);
}

function calcularCantidadTotal() {
    let total = 0;
    for (const mpId in acumulado.materiaPrima) {
        total += acumulado.materiaPrima[mpId].cantidad;
    }
    return total;
}

function realizarPago() {
    const formaPago = document.querySelector('input[name="formaPago"]:checked').value;

    if (formaPago === "capital") {
        alert("Pago realizado con Capital.");
    } else if (formaPago === "préstamo") {
        alert("Pago realizado con Préstamo.");
    } else if (formaPago === "ambos") {
        alert("Pago realizado con Ambos.");
    }

    // Limpiar el acumulado
    acumulado = {
        totalCosto: 0,
        materiaPrima: {}
    };

    // Limpia la tabla
    const tablaMateriaPrima = document.getElementById("tablaMateriaPrima").getElementsByTagName('tbody')[0];
    tablaMateriaPrima.innerHTML = "";

    // Oculta la fila de acumulado
    const acumuladoRow = document.getElementById("acumuladoRow");
    acumuladoRow.style.display = "none";

    // Actualizar el saldo
    document.getElementById("saldoActual").textContent = saldo.toFixed(2) + " soles";
}