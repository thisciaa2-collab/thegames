let clicks = 0;
let clicsPorSegundo = 0;
let valorClicManual = 1;

const mejorasManuales = [
    { id: 1, nombre: "Dedos Pegajosos", costo: 10, beneficio: 1, cantidad: 0, desc: "Tus dedos se adhieren mejor al plástico." },
    { id: 2, nombre: "Mouse de Fibra de Carbono", costo: 150, beneficio: 5, cantidad: 0, desc: "Un hardware premium para clics de alta gama." },
    { id: 3, nombre: "Puntero Cibernético", costo: 1200, beneficio: 35, cantidad: 0, desc: "Modificaciones mecánicas directo en tus tendones." },
    { id: 4, nombre: "Poder de la Mente", costo: 18000, beneficio: 400, cantidad: 0, desc: "Haces clic con tan solo desearlo intensamente." }
];

const cosasAbsurdas = [
    { id: 1, nombre: "Un Duende Contratado", costo: 50, cps: 0.5, cantidad: 0, desc: "Le pagas con aire para que cliquee por ti." },
    { id: 2, nombre: "Fábrica de Clones de Dedos", costo: 400, cps: 4, cantidad: 0, desc: "Tubos de ensayo llenos de dedos índices pulsando pantallas." },
    { id: 3, nombre: "Un Agujero Negro Doméstico", costo: 3500, cps: 32, cantidad: 0, desc: "La distorsión gravitacional genera clics infinitos." },
    { id: 4, nombre: "Inteligencia Artificial Inestable", costo: 45000, cps: 280, cantidad: 0, desc: "Se dedica a clickear mientras planea dominar la web." },
    { id: 5, nombre: "La Abuela del Espacio", costo: 250000, cps: 1450, cantidad: 0, desc: "Hornea galletas y destruye botones interdimensionales." }
];

const logsAbsurdos = [
    "El botón emitió un crujido sospechoso.",
    "Tus clics han despertado un satélite espía ruso.",
    "Cuidado, el botón se está calentando un poco.",
    "Un duende acaba de sindicalizarse en la tienda.",
    "Has roto las leyes de la física del plástico suave.",
    "El servidor central del juego se ríe de tu insistencia.",
    "¡Alerta! Se detectó un exceso de diversión en la pantalla.",
    "El botón te respeta, pero teme por su vida."
];

const contadorClicksDOM = document.getElementById("contadorClicks");
const contadorCpsDOM = document.getElementById("contadorCPS");
const contadorPoderDOM = document.getElementById("contadorPoder");
const botonPrincipal = document.getElementById("botonPrincipal");
const mensajeSistema = document.getElementById("mensajeSistema");
const tiendaManualDOM = document.getElementById("tiendaManual");
const tiendaAutomaticaDOM = document.getElementById("tiendaAutomatica");

function renderizarTiendaManual() {
    tiendaManualDOM.innerHTML = "";
    mejorasManuales.forEach(m => {
        const puedeComprar = clicks >= m.costo;
        const tarjeta = document.createElement("div");
        tarjeta.className = "mejora-card";
        tarjeta.innerHTML = `
            <div class="mejora-info">
                <h3>${m.nombre} (${m.cantidad})</h3>
                <p>${m.desc}</p>
                <span>Costo: ${Math.floor(m.costo)} | +${m.beneficio} por clic</span>
            </div>
            <button class="btn-comprar" ${!puedeComprar ? 'disabled' : ''} onclick="comprarMejoraManual(${m.id})">
                Mejorar
            </button>
        `;
        tiendaManualDOM.appendChild(tarjeta);
    });
}

function renderizarTiendaAutomatica() {
    tiendaAutomaticaDOM.innerHTML = "";
    cosasAbsurdas.forEach(c => {
        const puedeComprar = clicks >= c.costo;
        const tarjeta = document.createElement("div");
        tarjeta.className = "mejora-card";
        tarjeta.innerHTML = `
            <div class="mejora-info">
                <h3>${c.nombre} (${c.cantidad})</h3>
                <p>${c.desc}</p>
                <span>Costo: ${Math.floor(c.costo)} | +${c.cps} CPS</span>
            </div>
            <button class="btn-comprar" ${!puedeComprar ? 'disabled' : ''} onclick="comprarCosaAbsurda(${c.id})">
                Comprar
            </button>
        `;
        tiendaAutomaticaDOM.appendChild(tarjeta);
    });
}

function actualizarInterfaz() {
    contadorClicksDOM.innerText = Math.floor(clicks).toLocaleString();
    contadorCpsDOM.innerText = `${clicsPorSegundo.toFixed(1)} clics/seg`;
    contadorPoderDOM.innerText = `Valor del clic: +${valorClicManual}`;
}

botonPrincipal.addEventListener("click", (e) => {
    clicks += valorClicManual;
    actualizarInterfaz();
    renderizarTiendaManual();
    renderizarTiendaAutomatica();
    crearEfectoFlotante(e);
    
    if (Math.random() < 0.15) {
        const msgAzar = logsAbsurdos[Math.floor(Math.random() * logsAbsurdos.length)];
        mensajeSistema.innerText = msgAzar;
    }
});

function crearEfectoFlotante(e) {
    const span = document.createElement("span");
    span.className = "texto-flotante";
    span.innerText = `+${valorClicManual}`;
    span.style.left = `${e.clientX}px`;
    span.style.top = `${e.clientY}px`;
    document.body.appendChild(span);
    
    setTimeout(() => span.remove(), 700);
}

window.comprarMejoraManual = function(id) {
    const m = mejorasManuales.find(item => item.id === id);
    if (clicks >= m.costo) {
        clicks -= m.costo;
        m.cantidad++;
        valorClicManual += m.beneficio;
        m.costo *= 1.20;
        actualizarInterfaz();
        renderizarTiendaManual();
        renderizarTiendaAutomatica();
    }
}

window.comprarCosaAbsurda = function(id) {
    const c = cosasAbsurdas.find(item => item.id === id);
    if (clicks >= c.costo) {
        clicks -= c.costo;
        c.cantidad++;
        c.costo *= 1.15;
        recalcularCPS();
        actualizarInterfaz();
        renderizarTiendaManual();
        renderizarTiendaAutomatica();
    }
}

function recalcularCPS() {
    clicsPorSegundo = cosasAbsurdas.reduce((acc, item) => acc + (item.cantidad * item.cps), 0);
}

setInterval(() => {
    if (clicsPorSegundo > 0) {
        clicks += clicsPorSegundo / 10;
        actualizarInterfaz();
        renderizarTiendaManual();
        renderizarTiendaAutomatica();
    }
}, 100);

actualizarInterfaz();
renderizarTiendaManual();
renderizarTiendaAutomatica();
