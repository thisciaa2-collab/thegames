const articulosGamer = [
    { id: 1, juego: "Roblox", nombre: "Tarjeta de 800 Robux", precio: 10, emoji: "🟥", cantidad: 0 },
    { id: 2, juego: "Roblox", nombre: "Paquete Dominus Infinito", precio: 25000, emoji: "🦹", cantidad: 0 },
    { id: 3, juego: "Fortnite", nombre: "Lote de 1,000 Pavos", precio: 9, emoji: "🪙", cantidad: 0 },
    { id: 4, juego: "Fortnite", nombre: "Contratar a Ninja de Coach", precio: 120000000, emoji: "🥷", cantidad: 0 },
    { id: 5, juego: "Free Fire", nombre: "Caja de 100 Diamantes", precio: 1, emoji: "💎", cantidad: 0 },
    { id: 6, juego: "Free Fire", nombre: "Colección Armas Evolutivas", precio: 9500000, emoji: "🔫", cantidad: 0 },
    { id: 7, juego: "Global", nombre: "Comprar Epic Games y Roblox", precio: 65000000000, emoji: "🏢", cantidad: 0 }
];

const plantillasCorreos = [
    { remitente: "no-reply@roblox.com", asunto: "🚨 NOTIFICACIÓN DE SALDO NEGATIVO", cuerpo: "Hemos detectado que compraste un Dominus y luego solicitaste un reembolso procesado automáticamente por tu script. Tu cuenta tiene una deuda pendiente de -25,000 USD. Paga o borraremos tu avatar." },
    { remitente: "legal@epicgames.com", asunto: "⚖️ INTENCIÓN DE DEMANDA JUDICIAL", cuerpo: "Estimado usuario, la devolución de 450,000,000 de Pavos ha generado un agujero negro financiero en nuestra base de datos corporativa. Se le exige el pago de la deuda de manera inmediata." },
    { remitente: "garena-abuse@freefire.br", asunto: "💎 ALERTA DE HACKEO DE DIAMANTES", cuerpo: "Tu cuenta de jugador peligroso ha sido marcada por reembolsar insumos de diamantes de forma ilícita. Tu IP ha sido enviada al moderador del servidor regional." },
    { remitente: "banco-central@fraudes.gov", asunto: "🏦 EMBARGO INMINENTE DE BIENES", cuerpo: "Se han registrado movimientos sospechosos de 1 billón de dólares vinculados a transacciones cosméticas en juegos de disparos y bloques virtuales. Procederemos con medidas legales." }
];

let presupuestoTotal = 1000000000000;
let nivelSospecha = 0;

const marcadorDinero = document.getElementById("marcadorDinero");
const tiendaGrid = document.getElementById("tiendaGrid");
const listaCorreos = document.getElementById("listaCorreos");
const progresoSospecha = document.getElementById("progresoSospecha");

function formatearDinero(numero) {
    return "$" + numero.toLocaleString('en-US');
}

function renderizarTienda() {
    tiendaGrid.innerHTML = "";
    articulosGamer.forEach(articulo => {
        const puedeComprar = presupuestoTotal >= articulo.precio;
        const puedeVender = articulo.cantidad > 0;

        const tarjeta = document.createElement("div");
        tarjeta.className = "producto-card";
        tarjeta.innerHTML = `
            <div>
                <div class="emoji">${articulo.emoji}</div>
                <h3>${articulo.nombre}</h3>
                <div class="subtitulo">${articulo.juego}</div>
                <div class="precio">${formatearDinero(articulo.precio)}</div>
            </div>
            <div class="controles">
                <button 
                    class="btn btn-vender ${puedeVender ? 'activo' : ''}" 
                    ${!puedeVender ? 'disabled' : ''} 
                    onclick="reembolsarItem(${articulo.id})">
                    Reembolsar
                </button>
                <span class="cantidad">${articulo.cantidad}</span>
                <button 
                    class="btn btn-comprar" 
                    ${!puedeComprar ? 'disabled' : ''} 
                    onclick="comprarItem(${articulo.id})">
                    Comprar
                </button>
            </div>
        `;
        tiendaGrid.appendChild(tarjeta);
    });
    marcadorDinero.innerText = formatearDinero(presupuestoTotal);
}

window.comprarItem = function(id) {
    const articulo = articulosGamer.find(a => a.id === id);
    if (presupuestoTotal >= articulo.precio) {
        presupuestoTotal -= articulo.precio;
        articulo.cantidad++;
        renderizarTienda();
    }
}

// LÓGICA DE REEMBOLSO AUTOMÁTICO Y CORREOS DE DEUDAS
window.reembolsarItem = function(id) {
    const articulo = articulosGamer.find(a => a.id === id);
    if (articulo.cantidad > 0) {
        presupuestoTotal += articulo.precio;
        articulo.cantidad--;
        
        // El reembolso automático genera sospechas y deudas
        nivelSospecha += 14; 
        if (nivelSospecha > 100) nivelSospecha = 100;
        
        progresoSospecha.style.width = `${nivelSospecha}%`;
        
        generarCorreoFalso();
        renderizarTienda();
        
        // Disparador del final automático al llegar al límite
        if (nivelSospecha >= 100) {
            setTimeout(activarPantallaFinal, 600);
        }
    }
}

function generarCorreoFalso() {
    const plantilla = plantillasCorreos[Math.floor(Math.random() * plantillasCorreos.length)];
    const horaActual = new Date().toLocaleTimeString();
    
    const correo = document.createElement("div");
    correo.className = "correo-card";
    correo.innerHTML = `
        <div class="correo-meta">
            <span class="correo-remitente">${plantilla.remitente}</span>
            <span>${horaActual}</span>
        </div>
        <h4>${plantilla.asunto}</h4>
        <p>${plantilla.cuerpo}</p>
    `;
    
    // Lo insertamos al principio de la bandeja
    listaCorreos.insertBefore(correo, listaCorreos.firstChild);
}

function activarPantallaFinal() {
    document.getElementById("pantallaJuego").style.display = "none";
    document.getElementById("btnVolverHome").style.display = "none";
    document.getElementById("pantallaFinal").style.display = "flex";
}

window.reiniciarTodo = function() {
    presupuestoTotal = 1000000000000;
    nivelSospecha = 0;
    articulosGamer.forEach(a => a.cantidad = 0);
    listaCorreos.innerHTML = "";
    progresoSospecha.style.width = "0%";
    
    document.getElementById("pantallaFinal").style.display = "none";
    document.getElementById("btnVolverHome").style.display = "block";
    document.getElementById("pantallaJuego").style.display = "block";
    renderizarTienda();
}

// Correos iniciales base para rellenar la interfaz
setTimeout(generarCorreoFalso, 500);
setTimeout(generarCorreoFalso, 1500);

renderizarTienda();
