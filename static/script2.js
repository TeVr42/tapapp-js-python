var srcImages;

var documentWidth;
var documentHeight;
var smallScreen = window.matchMedia("(max-width: 1024px)");

var circleX;
var circleY;

var score = 6;
var gameIsOn = true;
var i = 0;
var seconds = 0;
var minutes = 0;
var removingSpeed;

var bigCircle = document.getElementById("bigCircle");
var mainColor;

var buttonReplay = document.getElementById("buttonReplay");
var mainTitle = document.getElementById("mainTitle");
var timerText = document.getElementById("timerText");
var buttonHome = document.getElementById("buttonHome");
var anchorHome = document.getElementById("anchorHome");
var percentageText = document.getElementById("percentageText");

function Game(speed, colorSources) {
    srcImages = colorSources;
    var index = Math.floor(Math.random() * srcImages.length);
    var source = srcImages[index];
    removingSpeed = speed;
    mainColor = "/static/images/" + source;
    bigCircle.setAttribute("src", mainColor);
    srcImages.splice(index, 1);

    buttonReplay.style.position = "static";
    HideElements([buttonHome, anchorHome]);
    ShowElements([bigCircle, timerText, percentageText]);
    setInterval(GenerateCircles, 200);
    setInterval(TimeCounter, 1000)
}

function GenerateCircles() {
    if (gameIsOn) {
    var randomAction = Math.floor(Math.random() * 2);
    if (randomAction == 0) {
        var index = Math.floor(Math.random() * srcImages.length);
        var source = srcImages[index];
        var circleColor = "/static/images/" + source;
        MakeCircle(circleColor, "OnCircleClick(event, -5)");
    } else {
        MakeCircle(mainColor, "OnCircleClick(event, 2)");
    }
    }
}


function MakeCircle(circleColor, akce) {
    documentWidth = document.documentElement.clientWidth;
    documentHeight = document.documentElement.clientHeight;

    newCircle = document.createElement("img");
    newCircle.setAttribute("src", circleColor);
    newCircle.setAttribute("id", "Circle" + i);
    newCircle.setAttribute("class", "circle");
    newCircle.setAttribute("onclick", akce);
    document.body.appendChild(newCircle);
    DeleteCircle(newCircle);

    if (smallScreen.matches) {
    circleX = Math.floor(Math.random() * 6) * documentWidth*0.16 + documentWidth*0.02;
    circleY = documentHeight*0.55;
    } else {
    circleX = Math.floor(Math.random() * 6) * documentWidth*0.10 + documentWidth*0.22;
    circleY = documentHeight*0.75;
    }

    newCircle.style.left = circleX + "px";
    newCircle.style.top = circleY + "px";

    i++;
}

function DeleteCircle(circleToDelete) {
    setTimeout(function(){ circleToDelete.remove(); }, removingSpeed);
}

function OnCircleClick(event, changeOfScore) {
    score = score + changeOfScore;
    document.getElementById(event.target.id).remove();
    if (smallScreen.matches) {
    bigCircle.style.width = 2 * score + "%";
    } else {
    bigCircle.style.width = score + "%";
    }
    percentageText.textContent = score * 5 + "%";
    if (score >= 20) {
        GameOver();
        mainTitle.textContent = "Výhra!";
        percentageText.textContent = "100 %";
    }
    if (score <= 0) {
        GameOver();
        mainTitle.textContent = "Prohra!";
        percentageText.textContent = "0 %";
    }
}

function GameOver() {
    gameIsOn = false;
    mainTitle.style.visibility = "visible";
    var circles = document.getElementsByClassName("circle");
    HideElements(circles);
    bigCircle.remove();
    ShowElements([buttonReplay, buttonHome, anchorHome]);
    if (smallScreen.matches) {
    mainTitle.style.fontSize = "3.5rem";
    } else {
    mainTitle.style.fontSize = "5rem";
    }
}

function TimeCounter() {
    if (gameIsOn){
    seconds ++;

    if (seconds == 60) {
    seconds = seconds - 60;
    minutes ++;
    }
    if (minutes == 60) {
    gameIsOn = false;
    }

    var textSeconds;
    var textMinutes;
    if (seconds < 10) {
        textSeconds = "0" + seconds;
    } else {
        textSeconds = seconds;
    }
    if (minutes < 10) {
        textMinutes = "0" + minutes;
    } else {
        textMinutes = minutes;
    }
    timerText.textContent = textMinutes + ":" + textSeconds;
    }
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