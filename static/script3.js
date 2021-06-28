var buttonReplay = document.getElementById("buttonReplay");
var mainTitle = document.getElementById("mainTitle");
var buttonHome = document.getElementById("buttonHome");
var anchorHome = document.getElementById("anchorHome");

var myBackground = document.getElementById("backgroundGame");

var smallScreen = window.matchMedia("(max-width: 600px)");

var start;
var gameIsOn = true;

function Game() {
    var randomTime = Math.floor(Math.random() * 5000) + 800;
    setTimeout(StartTimer, randomTime);
}

function StartTimer() {
    if (gameIsOn) {
    start = Date.now();
    myBackground.setAttribute("class", "color_bg_game3");
    myBackground.setAttribute("onclick", "OnRightClick()");
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
}

function ShowElements(elements) {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "visible";
    }
}

function Replay() {
    location.reload();
}
