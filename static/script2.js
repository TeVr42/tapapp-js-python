var zdrojeObrazku = ["k1.png", "k3.png", "k5.png", "k7.png", "k8.png", "k10.png"]

var documentSirka;
var documentVyska;
var malaObrazovka = window.matchMedia("(max-width: 600px)");

var kruhX;
var kruhY;

var skore = 6;
var hraBezi = true;
var i = 0;
var vteriny = 0;
var minuty = 0;
var rychlostVymazani;

var velkyKruh = document.getElementById("velkyKruh");
var hlavniBarva;

var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");
var napis = document.getElementById("hlavniNapis");
var casNapis = document.getElementById("casovacNapis");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var anchorDomu = document.getElementById("anchorDomu");
var napisProcenta = document.getElementById("procentaNapis");

function Hrat(rychlost) {
    var index = Math.floor(Math.random() * zdrojeObrazku.length);
    var zdroj = zdrojeObrazku[index];
    rychlostVymazani = rychlost;
    hlavniBarva = "/static/images/" + zdroj;
    velkyKruh.setAttribute("src", hlavniBarva);
    zdrojeObrazku.splice(index, 1);

    tlacitkoZnovu.style.position = "static";
    Schovat([tlacitkoDomu, anchorDomu]);
    Zviditelnit([velkyKruh, casNapis, napisProcenta]);
    setInterval(GenerujKruhy, 200);
    setInterval(PocitadloCasu, 1000)
}

function GenerujKruhy() {
    var nahodnaAkce = Math.floor(Math.random() * 2);
    if (nahodnaAkce == 0) {
        VytvorCiziKruh();
    } else {
        VytvorVlastniKruh();
    }
}

function VytvorCiziKruh() {
    if (hraBezi) {
    var index = Math.floor(Math.random() * zdrojeObrazku.length);
    var zdroj = zdrojeObrazku[index];
    var barva = "/static/images/" + zdroj;
    VytvorKruh(barva, "KlinutiNaKruh(event, -5)");
}
}

function VytvorVlastniKruh() {
    if (hraBezi) {
    VytvorKruh(hlavniBarva, "KlinutiNaKruh(event, 1)");
}
}

function VytvorKruh(barva, akce) {
    documentSirka = document.documentElement.clientWidth;
    documentVyska = document.documentElement.clientHeight;

    kruh = document.createElement("img");
    kruh.setAttribute("src", barva);
    kruh.setAttribute("id", "Kruh" + i);
    kruh.setAttribute("class", "kruh");
    kruh.setAttribute("onclick", akce);
    document.body.appendChild(kruh);
    VymazatKruh(kruh);

    if (malaObrazovka.matches) {
    kruhX = Math.floor(Math.random() * 6) * documentSirka*0.16 + documentSirka*0.02;
    kruhY = documentVyska*0.55;
    } else {
    kruhX = Math.floor(Math.random() * 6) * documentSirka*0.10 + documentSirka*0.22;
    kruhY = documentVyska*0.75;
    }

    kruh.style.left = kruhX + "px";
    kruh.style.top = kruhY + "px";

    i++;
}

function VymazatKruh(kruhKVymazani) {
    setTimeout(function(){ kruhKVymazani.remove(); }, rychlostVymazani);
}

function KlinutiNaKruh(event, skoreUprava) {
    skore = skore + skoreUprava;
    document.getElementById(event.target.id).remove();
    if (malaObrazovka.matches) { 
    velkyKruh.style.width = 2 * skore + "%";
    } else {
    velkyKruh.style.width = skore + "%";
    }
    napisProcenta.textContent = skore * 5 + "%";
    if (skore >= 20) {
        KonecHry();
        napis.textContent = "Výhra!";
        napisProcenta.textContent = "100 %";
    }
    if (skore <= 0) {
        KonecHry();
        napis.textContent = "Prohra!";
        napisProcenta.textContent = "0 %";
    }
}

function KonecHry() {
    hraBezi = false;
    napis.style.visibility = "visible";
    var kruhy = document.getElementsByClassName("kruh");
    Schovat(kruhy);
    velkyKruh.remove();
    hlavniNapis.style.fontSize = "5rem";
    Zviditelnit([tlacitkoZnovu, tlacitkoDomu, anchorDomu]);
}

function PocitadloCasu() {
    if (hraBezi){    
    vteriny ++;

    if (vteriny == 60) {
    vteriny = vteriny - 60;
    minuty ++;
    }
    if (minuty == 60) {
    hraBezi = false;
    }

    var napisVeteriny;
    var napisMinuty;
    if (vteriny < 10) {
        napisVeteriny = "0" + vteriny;
    } else {
        napisVeteriny = vteriny;
    }
    if (minuty < 10) {
        napisMinuty = "0" + minuty;
    } else {
        napisMinuty = minuty;
    }
    casNapis.textContent = napisMinuty + ":" + napisVeteriny;
    }
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