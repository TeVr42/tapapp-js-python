from flask import Flask, render_template, redirect, url_for, flash, abort

app = Flask(__name__)

DARK_COLOR = "#4c586f"
LIGHT_COLOR = "#cbc5c1"
WHITE_COLOR = "#ebeced"
color_text = DARK_COLOR
color_bg = WHITE_COLOR

def is_game_on(game):
    if game == 0:
        game_status = False
    else:
        game_status = True
    return game_status

@app.route('/')
def home():
    return render_template("index.html", bg_color=color_bg, text_color=color_text)

@app.route('/dark')
def dark():
    global color_text
    color_text = LIGHT_COLOR
    global color_bg
    color_bg = DARK_COLOR
    return redirect(url_for("home"))

@app.route('/light')
def light():
    global color_text
    color_text = DARK_COLOR
    global color_bg
    color_bg = WHITE_COLOR
    return redirect(url_for("home"))

@app.route('/postreh/<int:game>/<int:speed>')
def hra1(game, speed):
    return render_template("game1.html", game=is_game_on(game), speed=speed, bg_color=color_bg, text_color=color_text)


@app.route('/presnost/<int:game>/<int:speed>')
def hra2(game,speed):
    return render_template("game2.html", game=is_game_on(game), speed=speed, bg_color=color_bg, text_color=color_text)


@app.route('/rychlost/<int:game>')
def hra3(game):
    return render_template("game3.html", game=is_game_on(game), bg_color=color_bg, text_color=color_text)


@app.route('/info')
def info():
    return render_template("info.html", bg_color=color_bg, text_color=color_text)


if __name__ == "__main__":
    app.run(port=5000)
