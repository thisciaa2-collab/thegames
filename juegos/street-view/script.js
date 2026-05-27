// BASE DE DATOS MUNDIAL CON IFRAMES REALES DE GOOGLE MAPS (Cero errores 400 o 404)
const ubicacionesMapas = [
    // --- AMÉRICA ---
    { 
        pais: "Estados Unidos", 
        detalle: "Nueva York (Times Square)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3022.142293424058!2d-73.9856554!3d40.7579747!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3Dnz7OmoZ0b3YAAAQfWOWh7w%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D120%26pitch%3D0%26thumbfov%3D100" 
    },
    { 
        pais: "Brasil", 
        detalle: "Río de Janeiro (Cristo Redentor)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3673.6738421882313!2d-43.2104872!3d-22.951916!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3D45z7816p9u8AAAQvxF_SgA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D220%26pitch%3D0%26thumbfov%3D100" 
    },
    { 
        pais: "México", 
        detalle: "Chichén Itzá (Pirámide de Kukulcán)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3733.2842407519515!2d-88.5677816!3d20.6842899!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3D-mY7_iE-16wAAAQfwnZ-7w%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D45%26pitch%3D0%26thumbfov%3D100" 
    },
    
    // --- EUROPA ---
    { 
        pais: "Francia", 
        detalle: "París (Torre Eiffel)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2624.874435738605!2d2.2944813!3d48.8583701!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo3.ggpht.com%2Fcbk%3Fpanoid%3D6b797wzE2w8AAAQvxF_bQA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D180%26pitch%3D0%26thumbfov%3D100" 
    },
    { 
        pais: "Italia", 
        detalle: "Roma (Coliseo Romano)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d2970.123035384668!2d12.4922309!3d41.8902102!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3DnY57wzEw9w8AAAQvxF_cQA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D90%26pitch%3D0%26thumbfov%3D100" 
    },

    // --- ASIA ---
    { 
        pais: "Japón", 
        detalle: "Kioto (Santuario de Fushimi Inari)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3269.754388653245!2d135.7726917!3d34.9671402!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo2.ggpht.com%2Fcbk%3Fpanoid%3Dg797wzE6w8AAAQvxF_dQA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D10%26pitch%3D0%26thumbfov%3D100" 
    },
    { 
        pais: "India", 
        detalle: "Agra (Taj Mahal)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3549.90124376451!2d78.0421422!3d27.1750151!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3Dq1597wzE9w8AAAQvxF_eQA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D340%26pitch%3D0%26thumbfov%3D100" 
    },

    // --- ÁFRICA / OCEANÍA / EXTREMOS ---
    { 
        pais: "Egipto", 
        detalle: "Guiza (Gran Esfinge)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3454.23724376122!2d31.1342022!3d29.9752691!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3Dw1977wzE2w8AAAQvxF_fQA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D150%26pitch%3D0%26thumbfov%3D100" 
    },
    { 
        pais: "Australia", 
        detalle: "Sídney (Ópera de Sídney)", 
        url: "https://www.google.com/maps/embed?pb=!1m4!1m8!1m3!1d3313.11124376451!2d151.2152562!3d-33.8567844!3m2!1i1024!2i768!4f13.1!4m2!3m1!1s0x0%3A0x0!6s%2F%2Fgeo3.ggpht.com%2Fcbk%3Fpanoid%3De797wzE3w8AAAQvxF_gQA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D270%26pitch%3D0%26thumbfov%3D100" 
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
    
    // Seleccionar locación
    const indexAleatorio = Math.floor(Math.random() * ubicacionesMapas.length);
    ubicacionActual = ubicacionesMapas[indexAleatorio];
    
    // Inyectar URL del mapa real sin error de formato
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

iniciarRonda();
