var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");
var hlavniNapis = document.getElementById("hlavniNapis");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var odkazDomu = document.getElementById("odkazDomu");
var hlavniKruh = document.getElementById("kruhKeKliknuti");

var herniPozadi = document.getElementById("herniPozadi");
herniPozadi.style.height =  document.documentElement.clientHeight + "px";

var start;
var hraBezi = true;

function Hra() {
    var nahodnyCas = Math.floor(Math.random() * 5000) + 800;
    setTimeout(SpustCasomiru, nahodnyCas);
}

function SpustCasomiru() {
    if (hraBezi) {
    ZobrazElementy([hlavniKruh]);
    herniPozadi.setAttribute("class", "pozadi-hra3");
    herniPozadi.setAttribute("onclick", "PriSpravnemKliknuti()");
    start = Date.now();
    }
}

function PriSpravnemKliknuti() {
    KonecHry();
    var casovaProdleva = (Date.now() - start) + " milisekund";
    hlavniNapis.textContent = casovaProdleva;
    hlavniNapis.setAttribute("class", "velky-text napis-odsazeni");
}



function KonecHry() {
    hraBezi = false;
    ZobrazElementy([hlavniNapis, tlacitkoZnovu, tlacitkoDomu, odkazDomu]);
    herniPozadi.setAttribute("class", "");
    herniPozadi.setAttribute("onclick", "");
    SchovejElementy([hlavniKruh]);
}

function SchovejElementy(elementy) {
    for (i = 0; i < elementy.length; i++) {
    elementy[i].style.display = "none";
    }
}

function ZobrazElementy(elementy) {
    for (i = 0; i < elementy.length; i++) {
    elementy[i].style.display = "inline-block";
    }
}

function HrajZnovu() {
    location.reload();
}