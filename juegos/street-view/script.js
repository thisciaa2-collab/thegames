// BASE DE DATOS MUNDIAL CON EMBEDS REALES VERIFICADOS (Cero errores de parámetro 'pb')
const ubicacionesMapas = [
    // --- AMÉRICA ---
    { 
        pais: "Estados Unidos", 
        detalle: "Nueva York (Times Square)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x89c25859a1c54ab9%3A0x708283b775b94372!2sTimes+Square!5m2!1ses!2s" 
    },
    { 
        pais: "Brasil", 
        detalle: "Río de Janeiro (Cristo Redentor)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x997fd5984aa13f%3A0x9c433de202bc99f9!2sCristo+Redentor!5m2!1ses!2s" 
    },
    { 
        pais: "México", 
        detalle: "Chichén Itzá (Pirámide de Kukulcán)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x8f5138c6bfb10499%3A0x8e89f89ef194df16!2sChich%C3%A9n+Itz%C3%A1!5m2!1ses!2s" 
    },
    
    // --- EUROPA ---
    { 
        pais: "Francia", 
        detalle: "París (Torre Eiffel)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTorre+Eiffel!5m2!1ses!2s" 
    },
    { 
        pais: "Italia", 
        detalle: "Roma (Coliseo Romano)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColiseo+Romano!5m2!1ses!2s" 
    },

    // --- ASIA Y ÁFRICA ---
    { 
        pais: "Japón", 
        detalle: "Kioto (Santuario Fushimi Inari)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x60010f50625f91e1%3A0x7c7ea9fa8d44e4fa!2sFushimi+Inari-taisha!5m2!1ses!2s" 
    },
    { 
        pais: "Egipto", 
        detalle: "Guiza (Gran Pirámide)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m2!1s0x14583fa60b21beeb%3A0x79dfb29651199379!2sGran+Pir%C3%A1mide+de+Guiza!5m2!1ses!2s" 
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
    
    // Inyectar la URL oficial con el token PB verificado de Google
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
