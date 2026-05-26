const videoElement = document.getElementById('webcam');
const semaforoVisual = document.getElementById('semaforoVisual');
const puntosActuales = document.getElementById('puntosActuales');
const feedbackMano = document.getElementById('feedbackMano');
const cartelCarga = document.getElementById('cartelCarga');

const pantallaOverlay = document.getElementById('pantallaOverlay');
const tarjetaResultado = document.getElementById('tarjetaResultado');
const iconoResultado = document.getElementById('iconoResultado');
const tituloResultado = document.getElementById('tituloResultado');
const mensajeResultado = document.getElementById('mensajeResultado');

// Variables lógicas del juego
let score = 0;
let estadoSemaforo = "VERDE"; // "VERDE" o "ROJO"
let juegoActivo = true;

// Almacén de coordenadas de la mano para comparar movimientos en Luz Roja
let ultimaX = null;
let ultimaY = null;
const TOLERANCIA_MOVIMIENTO = 0.04; // Qué tanto puede temblar la mano en rojo antes de perder

// --- CONFIGURACIÓN DE MEDIAPIPE (IA DE GOOGLE) ---
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6
});

hands.onResults(procesarCapturaIA);

// Levantar cámara nativa del navegador
const camera = new Camera(videoElement, {
    onFrame: async () => {
        if (juegoActivo) {
            await hands.send({ image: videoElement });
        }
    },
    width: 640,
    height: 480
});

camera.start().then(() => {
    cartelCarga.style.display = "none"; // Ocultar mensaje al activar la cámara
});

// --- LÓGICA CORE DE DETECCIÓN Y MOVIMIENTO ---
function procesarCapturaIA(results) {
    if (!juegoActivo) return;

    // Verificar si hay alguna mano visible en pantalla
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        feedbackMano.innerText = "✋ Mano Detectada";
        feedbackMano.style.color = "#2ecc71";

        // Usamos las coordenadas del punto de la muñeca (Landmark 0) para medir el movimiento general
        const muneca = results.multiHandLandmarks[0][0];
        const posX = muneca.x;
        const posY = muneca.y;

        if (estadoSemaforo === "VERDE") {
            // En verde, si el usuario mueve la mano, gana puntos
            if (ultimaX !== null && ultimaY !== null) {
                const desplazamiento = Math.abs(posX - ultimaX) + Math.abs(posY - ultimaY);
                if (desplazamiento > 0.005) { // Movimiento mínimo para sumar
                    score += 1;
                    puntosActuales.innerText = score;
                    
                    if (score >= 100) {
                        finalizarJuego(true);
                    }
                }
            }
            // Guardamos posición actual
            ultimaX = posX;
            ultimaY = posY;

        } else if (estadoSemaforo === "ROJO") {
            // En rojo, calculamos si se movió respecto al momento del bloqueo
            if (ultimaX !== null && ultimaY !== null) {
                const cambioX = Math.abs(posX - ultimaX);
                const cambioY = Math.abs(posY - ultimaY);

                if (cambioX > TOLERANCIA_MOVIMIENTO || cambioY > TOLERANCIA_MOVIMIENTO) {
                    finalizarJuego(false); // ¡Eliminado por moverse!
                }
            }
        }
    } else {
        feedbackMano.innerText = "❌ Mano no detectada";
        feedbackMano.style.color = "#e74c3c";
    }
}

// --- CONTROL DE TIEMPOS DEL SEMÁFORO ---
function bucleSemaforo() {
    if (!juegoActivo) return;

    // Cambiar de estado de forma semi-aleatoria
    if (estadoSemaforo === "VERDE") {
        estadoSemaforo = "ROJO";
        semaforoVisual.innerText = "LUZ ROJA ¡CONGÉLATE!";
        semaforoVisual.className = "semaforo luz-roja";
        
        // Tiempo en rojo: entre 2 y 4 segundos
        setTimeout(bucleSemaforo, Math.random() * 2000 + 2000);
    } else {
        estadoSemaforo = "VERDE";
        semaforoVisual.innerText = "LUZ VERDE ¡MUÉVETE!";
        semaforoVisual.className = "semaforo luz-verde";
        
        // Tiempo en verde: entre 3 y 5 segundos
        setTimeout(bucleSemaforo, Math.random() * 2000 + 3000);
    }
}

// Iniciar los cambios de luces
setTimeout(bucleSemaforo, 3000);

// --- FINALES DEL JUEGO ---
function finalizarJuego(ganado) {
    juegoActivo = false;
    pantallaOverlay.style.display = "flex";

    if (ganado) {
        tarjetaResultado.className = "tarjeta-resultado ganado";
        iconoResultado.innerText = "🏆";
        tituloResultado.innerText = "¡SÚPER HUMANO!";
        mensajeResultado.innerText = "Impresionante. Controlas tus reflejos y tus músculos a nivel molecular. Has ganado el desafío.";
    } else {
        tarjetaResultado.className = "tarjeta-resultado";
        iconoResultado.innerText = "💀";
        tituloResultado.innerText = "¡ELIMINADO!";
        mensajeResultado.innerText = "La IA detectó un ligero movimiento en tu muñeca durante la luz roja. Has sido ejecutado informáticamente.";
    }
}

window.reiniciarJuego = function() {
    score = 0;
    puntosActuales.innerText = "0";
    ultimaX = null;
    ultimaY = null;
    estadoSemaforo = "VERDE";
    semaforoVisual.innerText = "LUZ VERDE ¡MUÉVETE!";
    semaforoVisual.className = "semaforo luz-verde";
    
    pantallaOverlay.style.display = "none";
    juegoActivo = true;

    // Relanzar el bucle
    setTimeout(bucleSemaforo, 3000);
}
