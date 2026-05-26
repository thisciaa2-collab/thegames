let saldoBancario = 100000000;
const marcadorBanco = document.getElementById("marcadorBanco");

function formatearDinero(numero) {
    return "$" + numero.toLocaleString('en-US');
}

window.comprarObjeto = function(costo) {
    if (saldoBancario >= costo) {
        saldoBancario -= costo;
        marcadorBanco.innerText = formatearDinero(saldoBancario);
        chequearBotonesDisponibles();
        
        if (saldoBancario <= 0) {
            marcadorBanco.style.color = "#e74c3c";
            marcadorBanco.innerText = "¡BANCARROTA TOTAL!";
        }
    }
}

function chequearBotonesDisponibles() {
    const botones = document.querySelectorAll(".btn-gastar");
    
    // El orden de los botones coincide con el HTML: Auto (50k), Mansión (12M), Isla (85M)
    const precios = [50000, 12000000, 85000000];
    
    botones.forEach((boton, index) => {
        if (saldoBancario < precios[index]) {
            boton.disabled = true;
        }
    });
}

// Inicializar el marcador al cargar
marcadorBanco.innerText = formatearDinero(saldoBancario);
