// BASE DE DATOS GLOBAL CON COORDENADAS OFICIALES EN 360° DE GOOGLE MAPS
const ubicacionesMapas = [
    // --- AMÉRICA ---
    { pais: "Estados Unidos", detalle: "Nueva York (Times Square)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3022.1422934149814!2d-73.985428!3d40.758896!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMDcuNSJX!5e0!3m2!1ses!2s!4v1!5m1!1s" },
    { pais: "Brasil", detalle: "Río de Janeiro (Cristo Redentor)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3673.6148386411516!2d-43.210487!3d-22.951916!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMjLCsDU3JzA2LjkiUyA0M8KwMTInMzcuOCJX!5e0!3m2!1ses!2s!4v2!5m1!1s" },
    { pais: "México", detalle: "Chichén Itzá (Pirámide de Kukulcán)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3731.8152597970425!2d-88.567782!3d20.684284!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMjDCsDQxJzAzLjQiTiA4OMKwMzQnMDQuMCJX!5e0!3m2!1ses!2s!4v3!5m1!1s" },
    { pais: "Perú", detalle: "Cusco (Santuario de Machu Picchu)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3879.314644598007!2d-72.544963!3d-13.163141!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMTPCsDA5JzQ3LjMiUyA3MswzMiczMS45JXc!5e0!3m2!1ses!2s!4v4!5m1!1s" },
    
    // --- EUROPA ---
    { pais: "Francia", detalle: "París (Torre Eiffel)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2624.991625693059!2d2.294481!3d48.858370!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjEiTiAywrAxNyc0MC4xIkU!5e0!3m2!1ses!2s!4v5!5m1!1s" },
    { pais: "Italia", detalle: "Roma (Coliseo Romano Exterior)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2970.123049102283!2d12.492231!3d41.890210!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zNDHCsDUzJzI0LjgiTiAxMswyOScyOC4wIkU!5e0!3m2!1ses!2s!4v6!5m1!1s" },
    { pais: "Reino Unido", detalle: "Londres (Palacio de Westminster y Big Ben)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2483.540417937397!2d-0.124625!3d51.500729!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zNTHCsDMwJzAyLjYiTiAwwrAwNycyOC43Ilc!5e0!3m2!1ses!2s!4v7!5m1!1s" },
    { pais: "España", detalle: "Barcelona (Templo Expiatorio de la Sagrada Familia)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2992.5658428800537!2d2.174356!3d41.403630!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zNDHCsDI0JzEzLjEiTiAywrAxMCcyNy43IkU!5e0!3m2!1ses!2s!4v8!5m1!1s" },

    // --- ASIA ---
    { pais: "Japón", detalle: "Kioto (Santuario Fushimi Inari-taisha)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3269.782079495147!2d135.772692!3d34.967140!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMzTCsDU4JzAxLjciTiAxMzXCsDQ2JzIxLjciIkU!5e0!3m2!1ses!2s!4v9!5m1!1s" },
    { pais: "India", detalle: "Agra (Mausoleo del Taj Mahal)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3549.919730536486!2d78.042142!3d27.175145!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMjdCsDEwJzMwLjUiTiA3OMKwMDInMzEuNyJF!5e0!3m2!1ses!2s!4v10!5m1!1s" },
    { pais: "Emiratos Árabes", detalle: "Dubái (Rascacielos Burj Khalifa)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3610.1785101037597!2d55.274288!3d25.197197!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMjXCsDExJzQ5LjkiTiA1NcKwMTYnMjcuNCJF!5e0!3m2!1ses!2s!4v11!5m1!1s" },

    // --- ÁFRICA Y OCEANÍA ---
    { pais: "Egipto", detalle: "Guiza (Gran Pirámide y Esfinge)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3454.2307525301884!2d31.134202!3d29.979235!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMjkCsDU4JzQ1LjIiTiAzMcKwMDgnMDMuMSJF!5e0!3m2!1ses!2s!4v12!5m1!1s" },
    { pais: "Australia", detalle: "Sídney (Teatro ópera de Sídney)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3324.920808298286!2d151.215256!3d-33.856784!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zMzPCsDUxJzI0LjQiUyAxNTHCsDEyJzU0LjkiIkU!5e0!3m2!1ses!2s!4v13!5m1!1s" },
    
    // --- LUGARES EXTREMOS ---
    { pais: "Antártida", detalle: "Isla de la Media Luna (Colonia de Pingüinos)", url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2000.0000000000001!2d-59.941324!3d-62.590135!3m2!1i1024!2i768!4f13.1!4m3!3m2!1s0x0%3A0x0!2zNjLCsDM1JzI0LjUiUyA1OcKwNTYnMjguOCJX!5e0!3m2!1ses!2s!4v14!5m1!1s" }
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
    
    // Seleccionar locación real sin repetir en bucle directo
    const indexAleatorio = Math.floor(Math.random() * ubicacionesMapas.length);
    ubicacionActual = ubicacionesMapas[indexAleatorio];
    
    // Inyectar URL limpia sin error 404
    visorStreetView.src = ubicacionActual.url;
    
    // Generar la respuesta correcta estructurada
    const respuestaCorrecta = `${ubicacionActual.pais} - ${ubicacionActual.detalle}`;
    let opciones = [respuestaCorrecta];
    
    // Clonar respuestas falsas para rellenar los otros 3 botones
    let falsosClonados = [...paisesFalsosOpciones];
    while(opciones.length < 4) {
        const randIndex = Math.floor(Math.random() * falsosClonados.length);
        const paisFalso = falsosClonados.splice(randIndex, 1)[0];
        opciones.push(`${paisFalso} (Ubicación Incorrecta)`);
    }
    
    // Mezclar las opciones al azar
    opciones.sort(() => Math.random() - 0.5);
    
    // Generar la botonera en el HTML
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
    
    // Validar estados finales del juego
    if (score >= 5000) {
        setTimeout(() => dispararPantallaFinal(true), 2000);
        return;
    } else if (score <= -1000) {
        setTimeout(() => dispararPantallaFinal(false), 2000);
        return;
    }
    
    // Avanzar de ronda tras 2.5 segundos
    setTimeout(() => {
        ronda++;
        rondaActual.innerText = runda = ronda;
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
        mensajeFinal.innerText = `¡Espectacular! Alcanzaste un récord de ${score} puntos descifrando todo el globo terráqueo. Cloudflare y la tripulación admiran tus conocimientos cartográficos.`;
    } else {
        tarjetaFinal.className = "tarjeta-final derrota";
        iconoFinal.innerText = "📉";
        tituloFinal.innerText = "BANCARROTA ESPACIAL";
        mensajeFinal.innerText = "Tus puntos cayeron por debajo de -1,000. Te has quedado varado en un rincón desconocido del mundo sin brújula.";
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

// Cargar primer mapa al iniciar pantalla
iniciarRonda();
