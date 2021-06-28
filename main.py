from flask import Flask, render_template
from settings import SETTINGS, LIGHT, DARK, PINK

app = Flask(__name__)


def get_colormode(color):
    for color_mode in [LIGHT, PINK, DARK]:
        if color == color_mode["main"]:
            return color_mode


def is_game_on(game):
    if game == 0:
        return False
    else:
        return True


@app.route('/')
def home():
    return render_template("index.html", mode=DARK["main"], settings=SETTINGS, title="Domů", main_colors=DARK["text_bg"])


@app.route('/<color>')
def colored(color):
    return render_template("index.html", mode=color, settings=SETTINGS, title="Domů", main_colors=get_colormode(color)["text_bg"])


@app.route('/<color>/postreh/<int:game>/<int:speed>/<int:prepared_circles>')
def hra1(color, game, speed, prepared_circles):
    colormode = get_colormode(color)
    return render_template("game1.html",
                           game=is_game_on(game), speed=speed, mode=colormode["main"], circles_colors=colormode["game1"],
                           settings=SETTINGS, title="Postřeh", main_colors=colormode["text_bg"], prepared_circles=prepared_circles)


@app.route('/<color>/presnost/<int:game>/<int:speed>')
def hra2(color, game, speed):
    colormode = get_colormode(color)
    return render_template("game2.html",
                           game=is_game_on(game), speed=speed, mode=colormode["main"], kruhy=colormode["game2"],
                           settings=SETTINGS, title="Přesnost", main_colors=colormode["text_bg"])


@app.route('/<color>/rychlost/<int:game>')
def hra3(color, game):
    colormode = get_colormode(color)
    return render_template("game3.html",
                           game=is_game_on(game), mode=colormode["main"],
                           settings=SETTINGS, title="Rychlost", main_colors=colormode["text_bg"])


@app.route('/<color>/info')
def info(color):
    return render_template("info.html", mode=get_colormode(color)["main"], settings=SETTINGS, title="Info",
                           main_colors=get_colormode(color)["text_bg"])


if __name__ == "__main__":
    app.run(port=5000)
