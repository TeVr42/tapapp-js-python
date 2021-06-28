var srcImages;

var documentWidth;
var documentHeight;
var smallScreen = window.matchMedia("(max-width: 600px)");

var circleWidth;
var circleX;
var circleY;

var score = 0;
var gameIsOn = true;
var i = 0;

var scoreTitle = document.getElementById("scoreTitle");
var buttonReplay = document.getElementById("buttonReplay");

var mainTitle = document.getElementById("mainTitle");
var buttonHome = document.getElementById("buttonHome");
var anchorHome = document.getElementById("anchorHome");

function Game(speed, sourceColors, prepared_circles=0) {
    srcImages = sourceColors;
    for (a = 0; a < prepared_circles; a++) {
    NewCircle();
    }
    setInterval(NewCircle, speed);
}

function NewCircle() {
    documentWidth = document.documentElement.clientWidth;
    documentHeight = document.documentElement.clientHeight;

    if (smallScreen.matches) {
    circleWidth = documentWidth * 0.15;
    } else {
    circleWidth = documentWidth * 0.05;
    }

    if (gameIsOn) {
    var circleNew = document.createElement("img");
    var index = Math.floor(Math.random() * srcImages.length);
    var source = srcImages[index];

    circleNew.setAttribute("src", "/static/images/" + source);
    circleNew.setAttribute("id", "Circle" + i);
    circleNew.setAttribute("class", "circle");
    circleNew.setAttribute("onclick", "OnClick(event)");
    document.body.appendChild(circleNew);

    circleX = Math.floor(Math.random() *(documentWidth - circleWidth));
    circleY = Math.floor(Math.random() * (documentHeight - circleWidth));

    circleNew.style.left = circleX + "px";
    circleNew.style.top = circleY + "px";

    i++;
}
}

function OnClick(event) {
    document.getElementById(event.target.id).remove();

    score ++;
    if (score < 10) {
    scoreTitle.textContent = "0" + score;
    } else {
    scoreTitle.textContent = score;
    }
    var circles = document.getElementsByClassName("circle");
    if (circles.length == 0) {
        gameIsOn = false;
        setTimeout(function(){
        ShowElements([buttonReplay, buttonHome, anchorHome, mainTitle]);
        }, 500)
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
