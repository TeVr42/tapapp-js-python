var mainCircle = document.getElementById("circleToClick");
var buttonReplay = document.getElementById("buttonReplay");
var mainTitle = document.getElementById("mainTitle");
var buttonHome = document.getElementById("buttonHome");
var anchorHome = document.getElementById("anchorHome");

var smallScreen = window.matchMedia("(max-width: 600px)");

var start;
var gameIsOn = true;

function Game() {
    var randomTime = Math.floor(Math.random() * 5000) + 500;
    setTimeout(StartTimer, randomTime);
}

function StartTimer() {
    if (gameIsOn) {
    ShowElements([mainCircle]);
    start = Date.now();
    }
}

function OnRightClick() {
    EndingClick();
    var waitingTime = (Date.now() - start) + " milisekund";
    mainTitle.textContent = waitingTime;
    if (smallScreen.matches) {
    mainTitle.style.fontSize = "2.6rem";
    } else {
    mainTitle.style.fontSize = "3.2rem";
    }
}


function EndingClick() {
    gameIsOn = false;
    ShowElements([mainTitle, buttonReplay, buttonHome, anchorHome]);
    HideElements([mainCircle]);
}

function HideElements(elements) {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "hidden";
    }
}

function ShowElements(elements) {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "visible";
    }
}

function Replay() {
    location.reload();
}
