var srcImages;

var documentDelka;
var documentVyska;
var malaObrazovka = window.matchMedia("(max-width: 600px)");

var delkaX;
var kruhX;
var kruhY;

var skore = 0;
var hraBezi = true;
var i = 0;

var skoreNapis = document.getElementById("skoreNapis");
var tlacitkoZnovu = document.getElementById("tlacitkoZnovu");

var napis = document.getElementById("hlavniNapis");
var tlacitkoDomu = document.getElementById("tlacitkoDomu");
var anchorDomu = document.getElementById("anchorDomu");

function Hra(rychlost, zdroje) {
    srcImages = zdroje;
    setInterval(VytvorKruh, rychlost);
}

function VytvorKruh() {
    documentDelka = document.documentElement.clientWidth;
    documentVyska = document.documentElement.clientHeight;

    if (malaObrazovka.matches) {
    delkaX = documentDelka * 0.15;
    } else {
    delkaX = documentDelka * 0.05;
    }

    if (hraBezi) {
    var kruh = document.createElement("img");
    var index = Math.floor(Math.random() * srcImages.length);
    var source = srcImages[index];

    kruh.setAttribute("src", "/static/images/" + source);
    kruh.setAttribute("id", "Kruh" + i);
    kruh.setAttribute("class", "kruh");
    kruh.setAttribute("onclick", "PriKliknuti(event)");
    document.body.appendChild(kruh);

    kruhX = Math.floor(Math.random() *(documentDelka - delkaX));
    kruhY = Math.floor(Math.random() * (documentVyska - delkaX));

    kruh.style.left = kruhX + "px";
    kruh.style.top = kruhY + "px";

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
        Zviditelnit([napis]);
        hraBezi = false;

        setTimeout(function(){
        Zviditelnit([tlacitkoZnovu, tlacitkoDomu, anchorDomu]);
        }, 1000)
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
