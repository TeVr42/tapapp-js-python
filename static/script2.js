var zdrojeObrazku;

var dokumentSirka;
var dokumentVyska;
var malaObrazovka = window.matchMedia("(max-width: 1024px)");

var kruhX;
var kruhY;

var skore = 6;
var hraBezi = true;
var i = 0;
var sekundy = 0;
var minuty = 0;
var rychlostMizeni;

var velkyKruh = document.getElementById("velkyKruh");
var hlavniKruh;

var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");
var hlavniNapis = document.getElementById("hlavniNapis");
var vypisCasu = document.getElementById("vypisCasu");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var odkazDomu = document.getElementById("odkazDomu");
var vypisProcenta = document.getElementById("vypisProcenta");

function Hra(rychlost, zdrojeBarev) {
    zdrojeObrazku = zdrojeBarev;
    var index = Math.floor(Math.random() * zdrojeObrazku.length);
    var zdroj = zdrojeObrazku[index];
    rychlostMizeni = rychlost;
    hlavniKruh = "/static/images/" + zdroj;
    velkyKruh.setAttribute("src", hlavniKruh);
    zdrojeObrazku.splice(index, 1);

    tlacitkoZnovu.style.position = "static";
    SchovejElementy([tlacitkoDomu, odkazDomu]);
    ZobrazElementy([velkyKruh, vypisCasu, vypisProcenta]);
    setInterval(GenerujKruhy, 200);
    setInterval(TimeCounter, 1000)
}

function GenerujKruhy() {
    if (hraBezi) {
    var nahodnyAkce = Math.floor(Math.random() * 2);
    if (nahodnyAkce == 0) {
        var index = Math.floor(Math.random() * zdrojeObrazku.length);
        var barvaKruhu = "/static/images/" + zdrojeObrazku[index];
        VytvorKruh(barvaKruhu, "PriKliknutiNaKruh(event, -5)");
    } else {
        VytvorKruh(hlavniKruh, "PriKliknutiNaKruh(event, 2)");
    }
    }
}

function VytvorKruh(barvaKruhu, akce) {
    dokumentSirka = document.documentElement.clientWidth;
    dokumentVyska = document.documentElement.clientHeight;

    novyKruh = document.createElement("img");
    novyKruh.setAttribute("src", barvaKruhu);
    novyKruh.setAttribute("id", "Kruh" + i);
    novyKruh.setAttribute("class", "kruh");
    novyKruh.setAttribute("onclick", akce);
    document.body.appendChild(novyKruh);
    SmazKruh(novyKruh);

    if (malaObrazovka.matches) {
    kruhX = Math.floor(Math.random() * 6) * dokumentSirka*0.16 + dokumentSirka*0.0275;
    kruhY = dokumentVyska*0.55;
    } else {
    kruhX = Math.floor(Math.random() * 6) * dokumentSirka*0.10 + dokumentSirka*0.225;
    kruhY = dokumentVyska*0.75;
    }

    novyKruh.style.left = kruhX + "px";
    novyKruh.style.top = kruhY + "px";

    i++;
}

function SmazKruh(kruhKeSmazani) {
    setTimeout(function(){ kruhKeSmazani.remove(); }, rychlostMizeni);
}

function PriKliknutiNaKruh(event, zmenaSkore) {
    skore = skore + zmenaSkore;
    document.getElementById(event.target.id).remove();
    if (malaObrazovka.matches) {
    velkyKruh.style.width = 2 * skore + "%";
    } else {
    velkyKruh.style.width = skore + "%";
    }
    vypisProcenta.textContent = skore * 5 + "%";
    if (skore >= 20) {
        KonecHry();
        hlavniNapis.textContent = "Výhra!";
        vypisProcenta.textContent = "100 %";
    }
    if (skore <= 0) {
        KonecHry();
        hlavniNapis.textContent = "Prohra!";
        vypisProcenta.textContent = "0 %";
    }
}

function KonecHry() {
    hraBezi = false;
    hlavniNapis.style.visibility = "visible";
    var kruhy = document.getElementsByClassName("kruh");
    SchovejElementy(kruhy);
    velkyKruh.remove();
    ZobrazElementy([tlacitkoZnovu, tlacitkoDomu, odkazDomu]);
    if (malaObrazovka.matches) {
    hlavniNapis.style.fontSize = "3.5rem";
    } else {
    hlavniNapis.style.fontSize = "5rem";
    }
}

function TimeCounter() {
    if (hraBezi){
    sekundy ++;

    if (sekundy == 60) {
    sekundy = sekundy - 60;
    minuty ++;
    }
    if (minuty == 60) {
    hraBezi = false;
    }

    var textSekundy;
    var textMinuty;
    if (sekundy < 10) {
        textSekundy = "0" + sekundy;
    } else {
        textSekundy = sekundy;
    }
    if (minuty < 10) {
        textMinuty = "0" + minuty;
    } else {
        textMinuty = minuty;
    }
    vypisCasu.textContent = textMinuty + ":" + textSekundy;
    }
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