// Variables Globales
let ataqueJugador;
let ataqueEnemigo;

let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "none";

    let sectionReiniciar = document.getElementById("reiniciar");
    sectionReiniciar.style.display = "none";

    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    document.getElementById("boton-fuego").addEventListener("click", ataqueFuego);
    document.getElementById("boton-agua").addEventListener("click", ataqueAgua);
    document.getElementById("boton-tierra").addEventListener("click", ataqueTierra);

    let botonReiniciar = document.getElementById("boton-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = "none";

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "flex";

    let spanMascotaJugador = document.getElementById("mascota-jugador");
    let mascotaSeleccionada = document.querySelector("input[name='mascota']:checked");

    if (!mascotaSeleccionada) {
        alert("Debes seleccionar una Mascota");
        return;
    }

    spanMascotaJugador.innerHTML = mascotaSeleccionada.id.charAt(0).toUpperCase() + mascotaSeleccionada.id.slice(1);
    
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

    let mascotas = ["Hipodoge", "Capipepo", "Ratigueya"];
    spanMascotaEnemigo.innerHTML = mascotas[mascotaAleatoria - 1];
}

function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataques = ["FUEGO", "AGUA", "TIERRA"];
    ataqueEnemigo = ataques[aleatorio(0, 2)];
    combate();
}

function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");

    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === "FUEGO" && ataqueEnemigo === "TIERRA") ||
        (ataqueJugador === "AGUA" && ataqueEnemigo === "FUEGO") ||
        (ataqueJugador === "TIERRA" && ataqueEnemigo === "AGUA")
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES, GANASTE");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("LO SIENTO, PERDISTE");
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById("resultado");
    let ataquesDelJugador = document.getElementById("ataques-del-jugador");
    let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

    sectionMensajes.innerHTML = resultado;
    ataquesDelJugador.innerHTML = ataqueJugador;
    ataquesDelEnemigo.innerHTML = ataqueEnemigo;
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("resultado");
    sectionMensajes.innerHTML = resultadoFinal;

    document.getElementById("boton-fuego").disabled = true;
    document.getElementById("boton-agua").disabled = true;
    document.getElementById("boton-tierra").disabled = true;

    let sectionReiniciar = document.getElementById("reiniciar");
    sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);



