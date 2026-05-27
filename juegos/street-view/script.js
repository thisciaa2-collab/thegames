// Base de datos de ubicaciones usando Street View Embeds públicos estables en 360°
const ubicacionesMapas = [
    { pais: "Francia", detalle: "París (Torre Eiffel)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2624.991625693043!2d2.2944813!3d48.8583701!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000000!5m2!1ses!2s!6m1!1s" },
    { pais: "Japón", detalle: "Kioto (Templo Tradicional)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3268.123456789!2d135.773211!3d34.994856!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000001!5m2!1ses!2s!6m1!1s" },
    { pais: "Estados Unidos", detalle: "Nueva York (Times Square)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3022.1415926535!2d-73.985664!3d40.757975!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000002!5m2!1ses!2s!6m1!1s" },
    { pais: "Egipto", detalle: "El Cairo (Pirámides de Giza)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3454.2123456789!2d31.134202!3d29.979234!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000003!5m2!1ses!2s!6m1!1s" },
    { pais: "Italia", detalle: "Roma (Coliseo Romano)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2970.123456789!2d12.492231!3d41.890210!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000004!5m2!1ses!2s!6m1!1s" },
    { pais: "Reino Unido", detalle: "Londres (Puente de la Torre)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2519.123456789!2d-0.075356!3d51.505562!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000005!5m2!1ses!2s!6m1!1s" },
    { pais: "Brasil", detalle: "Río de Janeiro (Cristo Redentor)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3673.123456789!2d-43.210487!3d-22.951916!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000006!5m2!1ses!2s!6m1!1s" },
    { pais: "Australia", detalle: "Sídney (Ópera de Sídney)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3385.123456789!2d151.215256!3d-33.856784!3m2!1i1024!2i768!4f13.1!2m1!1sstreetview!5e0!3m2!1ses!2s!4v1710000000007!5m2!1ses!2s!6m1!1s" }
];

const paisesFalsosOpciones = ["Canadá", "Alemania", "México", "China", "España", "Argentina", "Rusia", "India"];

let score = 0;
let ronda = 1;
let ubicacionActual = null;

const visorStreetView = document.getElementById("visorStreetView");
const puntosActuales = document.getElementById("puntosActuales");
const rondaActual = document.getElementById("rondaActual");
const contenedorOpciones = document.getElementById("contenedorOpciones");
const feedbackRespuesta = document.getElementById("feedbackRespuesta");

const overlayFinal = document.getElementById("overlayFinal");
const tarjetaFinal = document.getElementById("tarjetaFinal");
const iconoFinal = document.getElementById("iconoFinal");
const tituloFinal = document.getElementById("tituloFinal");
const mensajeFinal = document.getElementById("mensajeFinal");

function iniciarRonda() {
    feedbackRespuesta.innerText = "";
    feedbackRespuesta.style.color = "unset";
    
    // Elegir una localización aleatoria del set
    const indexAleatorio = Math.floor(Math.random() * ubicacionesMapas.length);
    ubicacionActual = ubicacionesMapas[indexAleatorio];
    
    // Asignar el IFrame
    visorStreetView.src = ubicacionActual.url;
    
    // Armar set de 4 respuestas (1 correcta, 3 falsas aleatorias)
    let opciones = [ubicacionActual.pais + " - " + ubicacionActual.detalle];
    
    let falsosClonados = [...paisesFalsosOpciones];
    while(opciones.length < 4) {
        const randIndex = Math.floor(Math.random() * falsosClonados.length);
        const paisFalso = falsosClonados.splice(randIndex, 1)[0];
        opciones.push(paisFalso + " (Región Desconocida)");
    }
    
    // Mezclar las opciones para que la correcta no esté siempre en el mismo sitio
    opciones.sort(() => Math.random() - 0.5);
    
    // Renderizar botones
    contenedorOpciones.innerHTML = "";
    opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.className = "btn-opcion";
        btn.innerText = opcion;
        btn.onclick = () => verificarRespuesta(opcion, btn);
        contenedorOpciones.appendChild(btn);
    });
}

function verificarRespuesta(opcionSeleccionada, botonTocado) {
    // Bloquear todos los botones de la ronda para evitar clicks repetidos
    const botones = document.querySelectorAll(".btn-opcion");
    botones.forEach(b => b.disabled = true);
    
    const respuestaCorrecta = ubicacionActual.pais + " - " + ubicacionActual.detalle;
    
    if (opcionSeleccionada === respuestaCorrecta) {
        score += 400;
        botonTocado.classList.add("correcto");
        feedbackRespuesta.innerText = "¡ACIERTO EXCELENTE! (+400 puntos)";
        feedbackRespuesta.style.color = "#2ecc71";
    } else {
        score -= 200;
        botonTocado.classList.add("incorrecto");
        feedbackRespuesta.innerText = `FALLASTE (-200 pts). Era: ${respuestaCorrecta}`;
        feedbackRespuesta.style.color = "#e74c3c";
        
        // Iluminar en verde el botón correcto para guiar al usuario
        botones.forEach(b => {
            if (b.innerText === respuestaCorrecta) b.classList.add("correcto");
        });
    }
    
    // Actualizar datos globales en pantalla
    puntosActuales.innerText = score;
    
    // Chequear límites de condiciones de victoria o derrota absoluta
    if (score >= 5000) {
        setTimeout(() => dispararPantallaFinal(true), 1500);
        return;
    } else if (score <= -1000) {
        setTimeout(() => dispararPantallaFinal(false), 1500);
        return;
    }
    
    // Siguiente ronda después de una breve pausa dramática de 2.5 segundos
    setTimeout(() => {
        ronda++;
        rondaActual.innerText = ronda;
        iniciarRonda();
    }, 2500);
}

function dispararPantallaFinal(ganado) {
    overlayFinal.style.display = "flex";
    document.getElementById("btnVolver").style.display = "none";
    
    if (ganado) {
        tarjetaFinal.className = "tarjeta-final";
        iconoFinal.innerText = "🏆";
        tituloFinal.innerText = "¡GEÓGRAFO SUPREMO!";
        mensajeFinal.innerText = `Increíble. Conseguiste un total de ${score} puntos. Conoces el planeta Tierra como la palma de tu mano. Cloudflare y la tripulación te aclaman.`;
    } else {
        tarjetaFinal.className = "tarjeta-final derrota";
        iconoFinal.innerText = "📉";
        tituloFinal.innerText = "BANCARROTA GEOGRÁFICA";
        mensajeFinal.innerText = "Tus puntos cayeron por debajo de los -1,000. Te perdiste en el mapa y la IA tuvo que rescatar tus servidores.";
    }
}

window.reiniciarJuego = function() {
    score = 0;
    ronda = 1;
    puntosActuales.innerText = "0";
    rondaActual.innerText = "1";
    overlayFinal.style.display = "none";
    document.getElementById("btnVolver").style.display = "block";
    iniciarRonda();
}

// Arrancar primera localización
iniciarRonda();
