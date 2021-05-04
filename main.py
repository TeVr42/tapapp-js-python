from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

DARK_COLOR = "#4c586f"
LIGHT_COLOR = "#cbc5c1"
WHITE_COLOR = "#ebeced"
mode = "light"

CIRCLES_LIGHT = [
    ["k2.png", "k3.png", "k4.png", "k5.png", "k9.png", "k10.png", "k16.png", "k17.png", "k18.png", "k19.png", "k21.png"],
    ["k2.png", "k3.png", "k5.png", "k9.png", "k10.png", "k18.png"],
    "k18.png"
    ]
CIRCLES_DARK = [
    ["k1.png", "k6.png", "k7.png", "k8.png", "k11.png", "k12.png", "k13.png", "k14.png", "k15.png", "k20.png"],
    ["k6.png", "k11.png", "k13.png", "k14.png"],
    "k12.png"
    ]
CIRCLES_PINK = [
    ["k2.png", "k3.png", "k4.png", "k5.png", "k9.png", "k10.png", "k16.png", "k17.png", "k18.png", "k19.png", "k21.png"],
    ["k2.png", "k3.png", "k5.png", "k9.png", "k10.png", "k18.png"],
    "k21.png"
    ]
current_circles = CIRCLES_LIGHT


def is_game_on(game):
    if game == 0:
        game_status = False
    else:
        game_status = True
    return game_status


@app.route('/')
def home():
    return render_template("index.html", mode=mode)


@app.route('/dark')
def dark():
    global mode
    mode = "dark"
    global current_circles
    current_circles = CIRCLES_DARK
    return redirect(url_for("home"))


@app.route('/light')
def light():
    global mode
    mode = "light"
    global current_circles
    current_circles = CIRCLES_LIGHT
    return redirect(url_for("home"))


@app.route('/pink')
def pink():
    global mode
    mode = "pink"
    global current_circles
    current_circles = CIRCLES_PINK
    return redirect(url_for("home"))


@app.route('/postreh/<int:game>/<int:speed>')
def hra1(game, speed):
    return render_template("game1.html", game=is_game_on(game), speed=speed, mode=mode, kruhy=current_circles[0])


@app.route('/presnost/<int:game>/<int:speed>')
def hra2(game, speed):
    return render_template("game2.html", game=is_game_on(game), speed=speed, mode=mode, kruhy=current_circles[1])


@app.route('/rychlost/<int:game>')
def hra3(game):
    return render_template("game3.html", game=is_game_on(game), mode=mode, kruhy=current_circles[2])


@app.route('/info')
def info():
    return render_template("info.html", mode=mode)


if __name__ == "__main__":
    app.run(port=5000)
