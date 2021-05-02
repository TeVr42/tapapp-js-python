var bilyKruh = document.getElementById("bilykruh");
var velkyKruh = document.getElementById("tlacitkoKruh");

var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");
var napis = document.getElementById("hlavniNapis");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var anchorDomu = document.getElementById("anchorDomu");

var start;
var hraBezi = true;

function Hrat() {
    Zviditelnit([bilyKruh]);
    var nahodnyCas = Math.floor(Math.random() * 8000) + 500;
    setTimeout(SpustitOdpocet, nahodnyCas);
}

function SpustitOdpocet() {
    if (hraBezi) {
    Schovat([bilyKruh]);
    Zviditelnit([velkyKruh]);
    start = Date.now();
    }
}

function SpravneKliknuti() {
    KlikutiKonec();
    var prodleva = (Date.now() - start) + " milisekund";
    napis.textContent = prodleva;
    napis.style.fontSize = "3rem";
}


function KlikutiKonec() {
    hraBezi = false;
    Zviditelnit([napis, tlacitkoZnovu, tlacitkoDomu, anchorDomu]);
    Schovat([velkyKruh, bilyKruh]);
}

function Schovat(elements) {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "hidden";
    }
}

function Zviditelnit(elements) {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "visible";
    }
}

function HratZnovu() {
    location.reload();
}
