// Base de datos de preguntas generada dinámicamente o preestablecida para el Quiz
const bancoPreguntas = [
    { pregunta: "5 × 4", respuesta: 20 },
    { pregunta: "12 + 9", respuesta: 21 },
    { pregunta: "7 × 3", respuesta: 21 },
    { pregunta: "15 + 18", respuesta: 33 },
    { pregunta: "8 × 6", respuesta: 48 },
    { pregunta: "45 + 27", respuesta: 72 },
    { pregunta: "9 × 4", respuesta: 36 },
    { pregunta: "33 + 58", respuesta: 91 },
    { pregunta: "6 × 7", respuesta: 42 },
    { pregunta: "100 + 89", respuesta: 189 }
];

let indicePreguntaActual = 0;
let respuestasCorrectasAcumuladas = 0;
let preguntaActualObj = null;

const numeroPregunta = document.getElementById("numeroPregunta");
const enunciadoPregunta = document.getElementById("enunciadoPregunta");
const contenedorOpciones = document.getElementById("contenedorOpciones");
const progresoVisual = document.getElementById("progresoVisual");
const cajaFeedback = document.getElementById("cajaFeedback");
const textoFeedback = document.getElementById("textoFeedback");

const overlayResultados = document.getElementById("overlayResultados");
const aciertosFinal = document.getElementById("aciertosFinal");
const mensajeEvaluacion = document.getElementById("mensajeEvaluacion");

function cargarPregunta() {
    cajaFeedback.style.display = "none";
    preguntaActualObj = bancoPreguntas[indicePreguntaActual];
    
    // Actualizar marcadores e indicadores
    numeroPregunta.innerText = indicePreguntaActual + 1;
    enunciadoPregunta.innerText = preguntaActualObj.pregunta;
    progresoVisual.style.width = `${(indicePreguntaActual / 10) * 100}%`;
    
    // Generar opciones falsas lógicas basadas en la respuesta real
    const solucion = preguntaActualObj.respuesta;
    let opcionesSet = new Set([solucion]);
    
    while(opcionesSet.size < 4) {
        // Desvíos matemáticos típicos (+-2, +-10, o multiplicaciones cercanas)
        const variacion = Math.floor(Math.random() * 15) + 1;
        const signo = Math.random() > 0.5 ? 1 : -1;
        const falsoValor = solucion + (variacion * signo);
        if(falsoValor >= 0) opcionesSet.add(falsoValor);
    }
    
    // Convertir a Array y mezclar
    const opcionesArray = Array.from(opcionesSet).sort(() => Math.random() - 0.5);
    
    // Renderizar botones de opciones
    contenedorOpciones.innerHTML = "";
    opcionesArray.forEach(valorOpcion => {
        const btn = document.createElement("button");
        btn.className = "btn-opcion";
        btn.innerText = valorOpcion;
        btn.onclick = () => procesarEleccion(valorOpcion, btn);
        contenedorOpciones.appendChild(btn);
    });
}

function procesarEleccion(valorSeleccionado, botonTocado) {
    const todosLosBotones = document.querySelectorAll(".btn-opcion");
    todosLosBotones.forEach(b => b.disabled = true); // Bloquear botonera
    
    const solucionCorrecta = preguntaActualObj.respuesta;
    cajaFeedback.style.display = "block";
    
    if (valorSeleccionado === solucionCorrecta) {
        respuestasCorrectasAcumuladas++;
        botonTocado.classList.add("correcto");
        cajaFeedback.className = "caja-feedback success";
        textoFeedback.innerText = "¡Excelente! Respuesta matemática correcta. 🎯";
    } else {
        botonTocado.classList.add("incorrecto");
        cajaFeedback.className = "caja-feedback danger";
        textoFeedback.innerText = `Incorrecto. La respuesta exacta era: ${solucionCorrecta}`;
        
        // Iluminar la correcta para enseñarle al usuario
        todosLosBotones.forEach(b => {
            if (parseInt(b.innerText) === solucionCorrecta) b.classList.add("correcto");
        });
    }
    
    // Esperar 2 segundos para que lean el feedback antes de cambiar de pregunta
    setTimeout(() => {
        indicePreguntaActual++;
        if (indicePreguntaActual < 10) {
            cargarPregunta();
        } else {
            finalizarCuestionario();
        }
    }, 2000);
}

function finalizarCuestionario() {
    progresoVisual.style.width = "100%";
    overlayResultados.style.display = "flex";
    document.getElementById("btnVolver").style.display = "none";
    
    aciertosFinal.innerText = respuestasCorrectasAcumuladas;
    
    // Mensaje de evaluación adaptativo
    if (respuestasCorrectasAcumuladas === 10) {
        mensajeEvaluacion.innerText = "¡Perfección absoluta! Eres un calculador veloz. Tu cerebro procesa operaciones al ritmo de los mejores procesadores.";
    } else if (respuestasCorrectasAcumuladas >= 7) {
        mensajeEvaluacion.innerText = "¡Muy buen puntaje! Tienes un excelente dominio de la aritmética básica. Listo para el siguiente nivel.";
    } else {
        mensajeEvaluacion.innerText = "Buen intento, pero necesitas entrenar esos reflejos numéricos. Dale otra oportunidad al juego para agilizar tu mente.";
    }
}

window.reiniciarQuiz = function() {
    indicePreguntaActual = 0;
    respuestasCorrectasAcumuladas = 0;
    overlayResultados.style.display = "none";
    document.getElementById("btnVolver").style.display = "block";
    cargarPregunta();
}

// Iniciar primer cuestionario
cargarPregunta();
