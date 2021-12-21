var zdrojeObrazku;

var dokumentSirka;
var dokumentVyska;
var malaObrazovka = window.matchMedia("(max-width: 1024px)");

var kruhSirka;
var kruhX;
var kruhY;

var skore = 0;
var hraBezi = true;
var i = 0;

var skoreNapis = document.getElementById("skoreNapis");
var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");

var hlavniNapis = document.getElementById("hlavniNapis");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var odkazDomu = document.getElementById("odkazDomu");

function Hra(ryhlost, zdrojBarev, predpripraveneKruhy=0) {
    zdrojObrazku = zdrojBarev;
    for (a = 0; a < predpripraveneKruhy; a++) {
    NovyKruh();
    }
    setInterval(NovyKruh, ryhlost);
}

function NovyKruh() {
    dokumentSirka = document.documentElement.clientWidth;
    dokumentVyska = document.documentElement.clientHeight;

    if (malaObrazovka.matches) {
    kruhSirka = dokumentSirka * 0.15;
    } else {
    kruhSirka = dokumentSirka * 0.05;
    }

    if (hraBezi) {
    var novyKruh = document.createElement("div");
    var index = Math.floor(Math.random() * zdrojObrazku.length);
    var zdroj = zdrojObrazku[index];

    novyKruh.style.backgroundColor = zdroj;
    novyKruh.setAttribute("id", "Kruh" + i);
    novyKruh.setAttribute("class", "kruh");
    novyKruh.setAttribute("onclick", "PriKliknuti(event)");
    document.body.appendChild(novyKruh);

    if (malaObrazovka.matches) {
    kruhX = Math.floor(Math.random() * (dokumentSirka - kruhSirka));
    kruhY = Math.floor(Math.random() * (dokumentVyska - kruhSirka));
    } else {
    kruhX = Math.floor(Math.random() * (dokumentSirka*0.6 - kruhSirka)) + dokumentSirka*0.2;
    kruhY = Math.floor(Math.random() * (dokumentVyska*0.8 - kruhSirka)) + dokumentVyska*0.1;
    }

    novyKruh.style.left = kruhX + "px";
    novyKruh.style.top = kruhY + "px";

    i++;
    }
}

function PriKliknuti(event) {
    document.getElementById(event.target.id).remove();

    skore ++;
    if (skore < 10) {
    skoreNapis.textContent = "0" + skore;
    } else {
    skoreNapis.textContent = skore;
    }

    var kruhy = document.getElementsByClassName("kruh");
    if (kruhy.length == 0) {
        KonecHry();
    }
    if (kruhy.length >= 100 || (kruhy.length >= 5 && skore >= 250)) {
        KonecHry();
        SchovejElementy(kruhy);
        hlavniNapis.textContent = "Příliš mnoho kruhů!";
    }
}

function KonecHry() {
        hraBezi = false;
        setTimeout(function(){
        ZobrazElementy([tlacitkoZnovu, tlacitkoDomu, odkazDomu, hlavniNapis]);
        }, 500)
}

function ZobrazElementy(elementy) {
    for (i = 0; i < elementy.length; i++) {
    elementy[i].style.display = "inline-block";
    }
}

function SchovejElementy(elementy) {
    for (i = 0; i < elementy.length; i++) {
    elementy[i].style.display = "none";
    }
}
function HrajZnovu() {
    location.reload();
}
