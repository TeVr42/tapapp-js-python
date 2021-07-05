var buttonReplay = document.getElementById("buttonReplay");
var mainTitle = document.getElementById("mainTitle");
var buttonHome = document.getElementById("buttonHome");
var anchorHome = document.getElementById("anchorHome");
var mainCircle = document.getElementById("circleToClick");

var myBackground = document.getElementById("backgroundGame");

var smallScreen = window.matchMedia("(max-width: 1024px)");

var start;
var gameIsOn = true;

function Game() {
    var randomTime = Math.floor(Math.random() * 5000) + 800;
    setTimeout(StartTimer, randomTime);
}

function StartTimer() {
    if (gameIsOn) {
    ShowElements([mainCircle]);
    myBackground.setAttribute("class", "color_bg_game3");
    myBackground.setAttribute("onclick", "OnRightClick()");
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
    myBackground.setAttribute("class", "");
    myBackground.setAttribute("onclick", "");
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