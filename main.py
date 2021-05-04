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
    ["k6.png", "k11.png", "k13.png"],
    "k12.png"
    ]
PINK = [
    "pink",
    ["k2.png", "k3.png", "k4.png", "k5.png", "k9.png", "k10.png", "k16.png", "k17.png", "k18.png", "k19.png", "k21.png"],
    ["k2.png", "k3.png", "k5.png", "k9.png", "k10.png", "k18.png"],
    "k21.png"
    ]


def get_colormode(color):
    if color == LIGHT[0]:
        return LIGHT
    elif color == PINK[0]:
        return PINK
    else:
        return DARK


def is_game_on(game):
    if game == 0:
        game_status = False
    else:
        game_status = True
    return game_status


@app.route('/')
def home():
    return render_template("index.html", mode=DARK[0])


@app.route('/<color>')
def colored(color):
    return render_template("index.html", mode=color)


@app.route('/<color>/postreh/<int:game>/<int:speed>')
def hra1(color, game, speed):
    colormode = get_colormode(color)
    return render_template("game1.html", game=is_game_on(game), speed=speed, mode=colormode[0], kruhy=colormode[1])


@app.route('/<color>/presnost/<int:game>/<int:speed>')
def hra2(color, game, speed):
    colormode = get_colormode(color)
    return render_template("game2.html", game=is_game_on(game), speed=speed, mode=colormode[0], kruhy=colormode[2])


@app.route('/<color>/rychlost/<int:game>')
def hra3(color, game):
    colormode = get_colormode(color)
    return render_template("game3.html", game=is_game_on(game), mode=colormode[0], kruhy=colormode[3])


@app.route('/<color>/info')
def info(color):
    return render_template("info.html", mode=get_colormode(color)[0])


if __name__ == "__main__":
    app.run(port=5000)
