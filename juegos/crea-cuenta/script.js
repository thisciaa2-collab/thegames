let pasoActual = 1;
const formularioCuerpo = document.getElementById("formularioCuerpo");
const barraProgreso = document.getElementById("barraProgreso");
const textoProgreso = document.getElementById("textoProgreso");
const consolaError = document.getElementById("consolaError");

// Muestra un error temporal en pantalla
function lanzarError(mensaje) {
    consolaError.innerText = `⚠️ Error: ${mensaje}`;
    consolaError.style.display = "block";
}

function ocultarError() {
    consolaError.style.display = "none";
}

function actualizarProgreso(porcentaje, texto) {
    barraProgreso.style.width = `${porcentaje}%`;
    textoProgreso.innerText = `Progreso del registro: ${porcentaje}%`;
}

// Carga las interfaces de cada paso
function cargarPaso() {
    ocultarError();
    
    if (pasoActual === 1) {
        actualizarProgreso(15);
        formularioCuerpo.innerHTML = `
            <div class="campo-grupo">
                <label for="inputUsuario">Nombre de Usuario Único</label>
                <input type="text" id="inputUsuario" placeholder="Ej: Juanito99" autocomplete="off">
            </div>
            <button class="btn-siguiente" onclick="validarPaso1()">Comprobar Disponibilidad</button>
        `;
    } 
    
    else if (pasoActual === 2) {
        actualizarProgreso(40);
        formularioCuerpo.innerHTML = `
            <div class="campo-grupo">
                <label for="inputPass">Crea una Contraseña Segura</label>
                <input type="password" id="inputPass" placeholder="••••••••••••" oninput="chequearPasswordLive()">
                <ul class="requisitos-lista">
                    <li id="req1">❌ Mínimo 14 caracteres.</li>
                    <li id="req2">❌ Debe incluir el año actual (2026).</li>
                    <li id="req3">❌ Debe incluir un emoji de fruta (🍌, 🍎, 🍇, 🥝).</li>
                </ul>
            </div>
            <button class="btn-siguiente" onclick="validarPaso2()">Establecer Contraseña</button>
        `;
    } 
    
    else if (pasoActual === 3) {
        actualizarProgreso(65);
        formularioCuerpo.innerHTML = `
            <div class="campo-grupo">
                <label>Verificación Humana: Selecciona solo los objetos que tengan crisis existencial</label>
                <div class="zona-captcha">
                    <div class="cuadro-captcha" onclick="toggleCaptcha(this, true)">🧸</div>
                    <div class="cuadro-captcha" onclick="toggleCaptcha(this, false)">🚗</div>
                    <div class="cuadro-captcha" onclick="toggleCaptcha(this, true)">🚬</div>
                    <div class="cuadro-captcha" onclick="toggleCaptcha(this, false)">🍕</div>
                    <div class="cuadro-captcha" onclick="toggleCaptcha(this, true)">🪞</div>
                    <div class="cuadro-captcha" onclick="toggleCaptcha(this, false)">⚽</div>
                </div>
            </div>
            <button class="btn-siguiente" onclick="validarPaso3()">Verificar que soy Humano</button>
        `;
    } 
    
    else if (pasoActual === 4) {
        actualizarProgreso(90);
        formularioCuerpo.innerHTML = `
            <div class="campo-grupo">
                <label>Términos de Servicio y Cesión de Alma</label>
                <div class="caja-terminos" id="cajaTerminos" onscroll="detectarScrollContrato()">
                    <p><strong>Cláusula 1.1:</strong> Al hacer clic en aceptar, usted cede los derechos comerciales de sus pensamientos matutinos a OmniNet Corp.</p><br>
                    <p><strong>Cláusula 1.2:</strong> Promete solemnemente no usar este software mientras cocina fideos, ya que la radiación de la pantalla podría alterar el sabor de la salsa.</p><br>
                    <p><strong>Cláusula 1.3:</strong> En caso de invasión alienígena, usted se compromete a defender las oficinas centrales usando únicamente un teclado de membrana obsoleto.</p><br>
                    <p><strong>Cláusula 1.4:</strong> Autoriza el uso de su GPU para calcular la órbita de un patito de goma espacial perdido en el metaverso.</p><br>
                    <p><em>[Sigue bajando para desbloquear el botón de aceptación obligatoria...]</em></p>
                </div>
                <label style="display:flex; align-items:center; gap:10px; margin-top:15px; font-size:0.9rem;">
                    <input type="checkbox" id="checkTerminos" disabled> He leído y acepto vender mi alma legalmente.
                </label>
            </div>
            <button class="btn-siguiente" id="btnFinalizar" onclick="validarPaso4()">Finalizar Registro</button>
        `;
    } 
    
    else if (pasoActual === 5) {
        actualizarProgreso(100);
        document.getElementById("textoProgreso").style.color = "#2ecc71";
        formularioCuerpo.innerHTML = `
            <div class="pantalla-exito">
                <div class="icono-check">🎉</div>
                <h2>¡CUENTA CREADA!</h2>
                <p style="margin-top:10px; color:#8a99ad;">Tu cuenta ha sido procesada con éxito. Desafortunadamente, nuestros servidores se han caído permanentemente hace 3 segundos.</p>
                <br>
                <a href="../../home.html" class="btn-siguiente" style="text-decoration:none; display:inline-block; text-align:center;">Volver al menú de juegos</a>
            </div>
        `;
    }
}

// --- LOGICA DE VALIDACIONES ---

// Paso 1: El nombre de usuario nunca está disponible a la primera
let intentosUsuario = 0;
window.validarPaso1 = function() {
    const user = document.getElementById("inputUsuario").value.trim();
    if(user === "") {
        lanzarError("Introduce un nombre.");
        return;
    }
    intentosUsuario++;
    if(intentosUsuario === 1) {
        lanzarError(`El nombre "${user}" fue confiscado por el gobierno en 2014. Elige otro.`);
    } else if(intentosUsuario === 2) {
        lanzarError(`"${user}" contiene letras demasiado comunes. Agrega más misticismo.`);
    } else {
        pasoActual = 2;
        cargarPaso();
    }
}

// Paso 2: Validación de contraseña en tiempo real y final
window.chequearPasswordLive = function() {
    const p = document.getElementById("inputPass").value;
    
    // Evaluar regla 1
    if(p.length >= 14) document.getElementById("req1").className = "cumplido";
    else document.getElementById("req1").className = "";

    // Evaluar regla 2
    if(p.includes("2026")) document.getElementById("req2").className = "cumplido";
    else document.getElementById("req2").className = "";

    // Evaluar regla 3
    if(["🍌","🍎","🍇","🥝"].some(fruta => p.includes(fruta))) document.getElementById("req3").className = "cumplido";
    else document.getElementById("req3").className = "";
}

window.validarPaso2 = function() {
    const p = document.getElementById("inputPass").value;
    const r1 = p.length >= 14;
    const r2 = p.includes("2026");
    const r3 = ["🍌","🍎","🍇","🥝"].some(f => p.includes(f));

    if(r1 && r2 && r3) {
        pasoActual = 3;
        cargarPaso();
    } else {
        lanzarError("Tu contraseña no cumple con los requisitos mínimos de salud cibernética.");
    }
}

// Paso 3: Captcha Absurdo
window.toggleCaptcha = function(elemento, esCorrecto) {
    elemento.classList.toggle("seleccionado");
    elemento.dataset.correcto = esCorrecto; // Guardamos metadato dinámico
}

window.validarPaso3 = function() {
    const cuadros = document.querySelectorAll(".cuadro-captcha");
    let error = false;

    cuandrosLoop: 
    for (let c of cuadros) {
        const seleccionado = c.classList.contains("seleccionado");
        const debiaSeleccionarse = c.dataset.correcto === "true";

        if(seleccionado !== debiaSeleccionarse) {
            error = true;
            break;
        }
    }

    if(!error) {
        pasoActual = 4;
        cargarPaso();
    } else {
        lanzarError("Fallaste. Claramente eres un androide frío y calculador.");
    }
}

// Paso 4: Obligar a leer el contrato
window.detectarScrollContrato = function() {
    const caja = document.getElementById("cajaTerminos");
    // Al llegar al fondo habilitamos el checkbox falso
    if (caja.scrollHeight - caja.scrollTop <= caja.clientHeight + 5) {
        document.getElementById("checkTerminos").removeAttribute("disabled");
    }
}

window.validarPaso4 = function() {
    const check = document.getElementById("checkTerminos");
    if(check.disabled) {
        lanzarError("Debes leer todo el contrato. Los abogados del metaverso te observan.");
        return;
    }
    if(!check.checked) {
        lanzarError("Debes marcar la casilla para confirmar la entrega de tu alma.");
        return;
    }
    pasoActual = 5;
    cargarPaso();
}

// Inicializar primer paso
cargarPaso();
