from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

LIGHT = [
    "light",
    ["k2.png", "k3.png", "k4.png", "k5.png", "k9.png", "k10.png", "k16.png", "k17.png", "k18.png", "k19.png", "k21.png"],
    ["k2.png", "k3.png", "k5.png", "k9.png", "k10.png", "k18.png"],
    "k18.png"
    ]
DARK = [
    "dark",
    ["k1.png", "k6.png", "k7.png", "k8.png", "k11.png", "k12.png", "k13.png", "k14.png", "k15.png", "k20.png"],
    ["k6.png", "k11.png", "k13.png", "k14.png"],
    "k12.png"
    ]
PINK = [
    "pink",
    ["k2.png", "k3.png", "k4.png", "k5.png", "k9.png", "k10.png", "k16.png", "k17.png", "k18.png", "k19.png", "k21.png"],
    ["k2.png", "k3.png", "k5.png", "k9.png", "k10.png", "k18.png"],
    "k21.png"
    ]
color_mode = LIGHT


def is_game_on(game):
    if game == 0:
        game_status = False
    else:
        game_status = True
    return game_status


@app.route('/')
def home():
    return render_template("index.html", mode=color_mode[0])


@app.route('/dark')
def dark():
    global color_mode
    color_mode = DARK
    return redirect(url_for("home"))


@app.route('/light')
def light():
    global color_mode
    color_mode = LIGHT
    return redirect(url_for("home"))


@app.route('/pink')
def pink():
    global color_mode
    color_mode = PINK
    return redirect(url_for("home"))


@app.route('/postreh/<int:game>/<int:speed>')
def hra1(game, speed):
    return render_template("game1.html", game=is_game_on(game), speed=speed, mode=color_mode[0], kruhy=color_mode[1])


@app.route('/presnost/<int:game>/<int:speed>')
def hra2(game, speed):
    return render_template("game2.html", game=is_game_on(game), speed=speed, mode=color_mode[0], kruhy=color_mode[2])


@app.route('/rychlost/<int:game>')
def hra3(game):
    return render_template("game3.html", game=is_game_on(game), mode=color_mode[0], kruhy=color_mode[3])


@app.route('/info')
def info():
    return render_template("info.html", mode=color_mode[0])


if __name__ == "__main__":
    app.run(port=5000)
