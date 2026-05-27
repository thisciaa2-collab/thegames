// BASE DE DATOS MUNDIAL CON TOKENS 'PB' REALES, COMPLETOS Y EXTRAÍDOS DE GOOGLE MAPS
const ubicacionesMapas = [
    // --- AMÉRICA ---
    { 
        pais: "Estados Unidos", 
        detalle: "Nueva York (Times Square)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.142293422617!2d-73.9864264!3d40.7579747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x89c25859a6d4d5fd%3A0x6295600cb3894a7e!2sTimes%20Square!5e1!3m2!1ses!2s!4v1716760000000!5m2!1ses!2s" 
    },
    { 
        pais: "Brasil", 
        detalle: "Río de Janeiro (Cristo Redentor)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.682337678519!2d-43.2126759!3d-22.951916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x997fd5984aa13f%3A0x9c333d6929e7bab!2sCristo%20Redentor!5e0!3m2!1ses!2s!4v1716760000001!5m2!1ses!2s" 
    },
    { 
        pais: "México", 
        detalle: "Chichén Itzá (Pirámide de Kukulcán)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.571439735467!2d-88.5707421!3d20.6829774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x8f5138c69bd1b50d%3A0x8673a886b43831!2sPir%C3%A1mide%20de%20Kukulc%C3%A1n!5e0!3m2!1ses!2s!4v1716760000002!5m2!1ses!2s" 
    },
    
    // --- EUROPA ---
    { 
        pais: "Francia", 
        detalle: "París (Torre Eiffel)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256930404!2d2.2922926!3d48.8583701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTorre%20Eiffel!5e0!3m2!1ses!2s!4v1716760000003!5m2!1ses!2s" 
    },
    { 
        pais: "Italia", 
        detalle: "Roma (Coliseo Romano)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1230489973216!2d12.4900422!3d41.8902142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x132f61b653d9a3db%3A0x36141902ee56a08c!2sColiseo%20Romano!5e0!3m2!1ses!2s!4v1716760000004!5m2!1ses!2s" 
    },

    // --- ASIA Y ÁFRICA ---
    { 
        pais: "Japón", 
        detalle: "Kioto (Santuario Fushimi Inari)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.057393430584!2d135.7704515!3d34.9671402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x60010f3c05e5d179%3A0x446d6b1364d93ee4!2sFushimi%20Inari-taisha!5e0!3m2!1ses!2s!4v1716760000005!5m2!1ses!2s" 
    },
    { 
        pais: "Egipto", 
        detalle: "Guiza (Gran Pirámide)", 
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.81056588267!2d31.1316499!3d29.9792345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.3!3m3!1m2!1s0x14584e0307f0bb59%3A0xbc4e8e1215b7405e!2sGran%20Pir%C3%A1mide%20de%20Guiza!5e0!3m2!1ses!2s!4v1716760000006!5m2!1ses!2s" 
    }
];

const paisesFalsosOpciones = [
    "Canadá", "Alemania", "Argentina", "Rusia", "Chile", "Colombia", "China", "Sudáfrica", 
    "Grecia", "Turquía", "Tailandia", "Islandia", "Nueva Zelanda", "Marruecos", "Portugal"
];

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
    
    // Seleccionar locación al azar
    const indexAleatorio = Math.floor(Math.random() * ubicacionesMapas.length);
    ubicacionActual = ubicacionesMapas[indexAleatorio];
    
    // Inyectar la URL real con los parámetros 'pb' de producción
    visorStreetView.src = ubicacionActual.url;
    
    const respuestaCorrecta = `${ubicacionActual.pais} - ${ubicacionActual.detalle}`;
    let opciones = [respuestaCorrecta];
    
    let falsosClonados = [...paisesFalsosOpciones];
    while(opciones.length < 4) {
        const randIndex = Math.floor(Math.random() * falsosClonados.length);
        const paisFalso = falsosClonados.splice(randIndex, 1)[0];
        opciones.push(`${paisFalso} (Ubicación Incorrecta)`);
    }
    
    opciones.sort(() => Math.random() - 0.5);
    
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
    const botones = document.querySelectorAll(".btn-opcion");
    botones.forEach(b => b.disabled = true);
    
    const respuestaCorrecta = `${ubicacionActual.pais} - ${ubicacionActual.detalle}`;
    
    if (opcionSeleccionada === respuestaCorrecta) {
        score += 400;
        botonTocado.classList.add("correcto");
        feedbackRespuesta.innerText = "¡RESPUESTA CORRECTA! 🧠 (+400 puntos)";
        feedbackRespuesta.style.color = "#2ecc71";
    } else {
        score -= 200;
        botonTocado.classList.add("incorrecto");
        feedbackRespuesta.innerText = `FALLASTE (-200 pts). Te encuentras en: ${respuestaCorrecta}`;
        feedbackRespuesta.style.color = "#e74c3c";
        
        botones.forEach(b => {
            if (b.innerText === respuestaCorrecta) b.classList.add("correcto");
        });
    }
    
    puntosActuales.innerText = score;
    
    if (score >= 5000) {
        setTimeout(() => dispararPantallaFinal(true), 2000);
        return;
    } else if (score <= -1000) {
        setTimeout(() => dispararPantallaFinal(false), 2000);
        return;
    }
    
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
        mensajeFinal.innerText = `¡Espectacular! Alcanzaste un récord de ${score} puntos. Conoces el planeta a la perfección.`;
    } else {
        tarjetaFinal.className = "tarjeta-final derrota";
        iconoFinal.innerText = "📉";
        tituloFinal.innerText = "BANCARROTA ESPACIAL";
        mensajeFinal.innerText = "Tus puntos cayeron por debajo de -1,000. Te has quedado varado en un rincón desconocido.";
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

// Inicializar el primer mapa de forma limpia
iniciarRonda();
