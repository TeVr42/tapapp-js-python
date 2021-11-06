var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");
var hlavniNapis = document.getElementById("hlavniNapis");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var odkazDomu = document.getElementById("odkazDomu");
var hlavniKruh = document.getElementById("kruhKeKliknuti");

var mePozadi = document.getElementById("herniPozadi");

var malaObrazovka = window.matchMedia("(max-width: 1024px)");

var start;
var hraBezi = true;

function Hra() {
    var nahodnyCas = Math.floor(Math.random() * 5000) + 800;
    setTimeout(ZacniOdpocet, nahodnyCas);
}

function ZacniOdpocet() {
    if (hraBezi) {
    ZobrazElementy([hlavniKruh]);
    mePozadi.setAttribute("class", "color_bg_game3");
    mePozadi.setAttribute("onclick", "OnRightClick()");
    start = Date.now();
    }
}

function PriSpravnemKliknuti() {
    SpatneKliknuti();
    var casovaProdleva = (Date.now() - start) + " milisekund";
    hlavniNapis.textContent = casovaProdleva;
    if (malaObrazovka.matches) {
    hlavniNapis.style.fontSize = "2.6rem";
    } else {
    hlavniNapis.style.fontSize = "3.2rem";
    }
}


function SpatneKliknuti() {
    hraBezi = false;
    ZobrazElementy([hlavniNapis, tlacitkoZnovu, tlacitkoDomu, odkazDomu]);
    mePozadi.setAttribute("class", "");
    mePozadi.setAttribute("onclick", "");
    SchovejElementy([hlavniKruh]);
}

function SchovejElementy(elementy) {
    for (i = 0; i < elementy.length; i++) {
    elementy[i].style.visibility = "hidden";
    }
}

function ZobrazElementy(elementy) {
    for (i = 0; i < elementy.length; i++) {
    elementy[i].style.visibility = "visible";
    }
}

function HrajZnovu() {
    location.reload();
}