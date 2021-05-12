from flask import Flask, render_template

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

settings = {
    "light_btn": "simple-button btn btn-outline-light btn-lg",
    "dark_btn": "simple-button btn btn-light btn-lg",
    "mode_light_btn": "mode-btn-light btn btn-outline-light",
    "mode_dark_btn": "mode-btn-dark btn btn-light",
}


def get_colormode(color):
    for color_mode in [LIGHT, PINK, DARK]:
        if color == color_mode[0]:
            return color_mode


def is_game_on(game):
    if game == 0:
        return False
    else:
        return True


@app.route('/')
def home():
    return render_template("index.html", mode=DARK[0], settings=settings, title="Domů")


@app.route('/<color>')
def colored(color):
    return render_template("index.html", mode=color, settings=settings, title="Domů")


@app.route('/<color>/postreh/<int:game>/<int:speed>')
def hra1(color, game, speed):
    colormode = get_colormode(color)
    return render_template("game1.html",
                           game=is_game_on(game), speed=speed, mode=colormode[0], circles_colors=colormode[1], settings=settings, title="Postřeh")


@app.route('/<color>/presnost/<int:game>/<int:speed>')
def hra2(color, game, speed):
    colormode = get_colormode(color)
    return render_template("game2.html",
                           game=is_game_on(game), speed=speed, mode=colormode[0], kruhy=colormode[2], settings=settings, title="Přesnost")


@app.route('/<color>/rychlost/<int:game>')
def hra3(color, game):
    colormode = get_colormode(color)
    return render_template("game3.html",
                           game=is_game_on(game), mode=colormode[0], kruhy=colormode[3], settings=settings, title="Rychlost")


@app.route('/<color>/info')
def info(color):
    return render_template("info.html", mode=get_colormode(color)[0], settings=settings, title="Info")


if __name__ == "__main__":
    app.run(port=5000)
