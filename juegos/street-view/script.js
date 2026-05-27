// BASE DE DATOS MUNDIAL - ENLACES EXCLUSIVOS DE STREET VIEW (NIVEL DE SUELO 360°)
const ubicacionesMapas = [
    // --- AMÉRICA ---
    { 
        pais: "Estados Unidos", 
        detalle: "Nueva York (Times Square)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d3022.6175402127393!2d-73.9856554!3d40.7579747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000000!5m2!1ses!2s!6m1!1s-1" 
    },
    { 
        pais: "Brasil", 
        detalle: "Río de Janeiro (Cristo Redentor)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d3673.697486842601!2d-43.2104872!3d-22.951916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000001!5m2!1ses!2s!6m1!1s-1" 
    },
    { 
        pais: "México", 
        detalle: "Chichén Itzá (Pirámide de Kukulcán)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d3733.111818296767!2d-88.5677819!3d20.6842899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000002!5m2!1ses!2s!6m1!1s-1" 
    },
    
    // --- EUROPA ---
    { 
        pais: "Francia", 
        detalle: "París (Bajo la Torre Eiffel)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d2624.8733612450516!2d2.2944813!3d48.8583701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000003!5m2!1ses!2s!6m1!1s-1" 
    },
    { 
        pais: "Italia", 
        detalle: "Roma (Frente al Coliseo)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d2970.12304886561!2d12.4922309!3d41.8902102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000004!5m2!1ses!2s!6m1!1s-1" 
    },

    // --- ASIA Y ÁFRICA ---
    { 
        pais: "Japón", 
        detalle: "Kioto (Santuario Fushimi Inari)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d3269.7533816489!2d135.7726917!3d34.9671402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000005!5m2!1ses!2s!6m1!1s-1" 
    },
    { 
        pais: "Egipto", 
        detalle: "Guiza (Esfinge y Pirámides)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m3!1d3454.2568603681493!2d31.1342019!3d29.9752687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2s!4v1716760000006!5m2!1ses!2s!6m1!1s-1" 
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
    
    // Forzar la carga limpia del Street View de la calle elegida
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
        mensajeFinal.innerText = `¡Espectacular! Alcanzaste un récord de ${score} puntos caminando por las calles virtuales del globo.`;
    } else {
        tarjetaFinal.className = "tarjeta-final derrota";
        iconoFinal.innerText = "📉";
        tituloFinal.innerText = "BANCARROTA ESPACIAL";
        mensajeFinal.innerText = "Tus puntos cayeron por debajo de -1,000. Te has quedado perdido en la acera sin mapa.";
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

// Iniciar juego con Street View real
iniciarRonda();
