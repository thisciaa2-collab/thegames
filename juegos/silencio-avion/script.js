let audioContext = null;
let analyser = null;
let dataArray = null;
let source = null;
let streamRef = null;

// Parámetros de juego de la azafata
// Distancia: inicia en 300px (fondo) y se detiene letalmente en 20px (frente a tu cara)
let distanciaAzafata = 300; 
let escalaAzafata = 0.4;
let juegoCorriendo = false;

const azafata = document.getElementById("azafata");
const burbujaTexto = document.getElementById("burbujaTexto");
const azafataEmoji = document.getElementById("azafataEmoji");
const llenadoRuido = document.getElementById("llenadoRuido");
const btnIniciarMicro = document.getElementById("btnIniciarMicro");
const contenedorMedidor = document.getElementById("contenedorMedidor");
const pantallaFinal = document.getElementById("pantallaFinal");

const frasesAzafata = [
    "Buenas noches...",
    "Shhh... por favor.",
    "Hay personas durmiendo...",
    "Disculpe, baje la voz.",
    "¿Podría hacer silencio?",
    "Le estoy advirtiendo...",
    "ÚLTIMO AVISO.",
    "¡QUE SE CALLE DICHO!"
];

window.inicializarAudio = async function() {
    try {
        // Pedir permiso nativo para acceder al micrófono del dispositivo
        streamRef = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Muestreo de frecuencia rápido
        
        source = audioContext.createMediaStreamSource(streamRef);
        source.connect(analyser);
        
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        // Ajustar interfaz
        btnIniciarMicro.style.display = "none";
        contenedorMedidor.style.display = "block";
        juegoCorriendo = true;
        
        // Lanzar bucle de análisis constante
        analizarVolumen();
        // Reducción natural de tensión si el usuario pasa tiempo callado
        setInterval(calmarCabina, 800);
        
    } catch (err) {
        alert("Para jugar debes permitir el acceso al micrófono. La azafata te necesita.");
        console.error(err);
    }
}

function analizarVolumen() {
    if (!juegoCorriendo) return;
    
    requestAnimationFrame(analizarVolumen);
    analyser.getByteFrequencyData(dataArray);
    
    // Calcular el promedio de volumen actual
    let suma = 0;
    for (let i = 0; i < dataArray.length; i++) {
        suma += dataArray[i];
    }
    let promedio = suma / dataArray.length;
    
    // Convertir a porcentaje para el llenado visual de la barra (máximo estimado 80)
    let porcentajeRuido = (promedio / 80) * 100;
    if (porcentajeRuido > 100) porcentajeRuido = 100;
    llenadoRuido.style.width = `${porcentajeRuido}%`;
    
    // UMBRAL DE RUIDO: Si el volumen supera un nivel bajo de habla (ej: 12) la azafata avanza
    if (promedio > 12) {
        // Entre más fuerte hables, más rápido avanza hacia ti
        let velocidadAvance = (promedio - 12) * 0.45;
        distanciaAzafata -= velocidadAvance;
        if (distanciaAzafata < 20) distanciaAzafata = 20; // Límite frontal
        
        // Ajustar escala visual para simular efecto 3D
        escalaAzafata = 0.4 + ((300 - distanciaAzafata) / 280) * 1.8;
        
        actualizarAzafata();
    }
}

function actualizarAzafata() {
    azafata.style.bottom = `${320 - distanciaAzafata}px`;
    azafata.style.transform = `translateX(-50%) scale(${escalaAzafata})`;
    
    // Determinar qué frase y qué emoji poner según qué tan cerca esté de ti
    if (distanciaAzafata > 230) {
        burbujaTexto.innerText = frasesAzafata[0];
        azafataEmoji.innerText = "👩‍✈️";
    } else if (distanciaAzafata > 170) {
        burbujaTexto.innerText = frasesAzafata[1];
        azafataEmoji.innerText = "🤫";
    } else if (distanciaAzafata > 120) {
        burbujaTexto.innerText = frasesAzafata[3];
        azafataEmoji.innerText = "🤨";
    } else if (distanciaAzafata > 60) {
        burbujaTexto.innerText = frasesAzafata[5];
        azafataEmoji.innerText = "😠";
    } else {
        burbujaTexto.innerText = frasesAzafata[7];
        azafataEmoji.innerText = "🤬";
        
        // Si llega al extremo absoluto... ¡GAME OVER!
        if (distanciaAzafata <= 20) {
            setTimeout(ejecutarExpulsion, 400);
        }
    }
}

// Mecánica de perdón: Si te mantienes en silencio absoluto, ella se aleja lentamente al fondo
function calmarCabina() {
    if (!juegoCorriendo) return;
    
    // Si se ha acercado y guardas silencio, retrocede gradualmente
    if (distanciaAzafata < 300) {
        distanciaAzafata += 8; 
        if (distanciaAzafata > 300) distanciaAzafata = 300;
        
        escalaAzafata = 0.4 + ((300 - distanciaAzafata) / 280) * 1.8;
        actualizarAzafata();
    }
}

function ejecutarExpulsion() {
    juegoCorriendo = false;
    
    // Apagar micrófono de forma limpia
    if (streamRef) {
        streamRef.getTracks().forEach(track => track.stop());
    }
    
    document.getElementById("btnVolver").style.display = "none";
    pantallaFinal.style.display = "flex";
}

window.reiniciarVuelo = function() {
    distanciaAzafata = 300;
    escalaAzafata = 0.4;
    llenadoRuido.style.width = "0%";
    pantallaFinal.style.display = "none";
    document.getElementById("btnVolver").style.display = "block";
    
    actualizarAzafata();
    inicializarAudio(); // Relanzar captura
}
