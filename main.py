from flask import Flask, render_template, redirect, url_for, flash, abort

app = Flask(__name__)

def is_game_on(game):
    if game == 0:
        game_status = False
    else:
        game_status = True
    return game_status

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/postreh/<int:game>/<int:speed>')
def hra1(game, speed):
    return render_template("game1.html", game=is_game_on(game), speed=speed)


@app.route('/presnost/<int:game>/<int:speed>')
def hra2(game,speed):
    return render_template("game2.html", game=is_game_on(game), speed=speed)


@app.route('/rychlost/<int:game>')
def hra3(game):
    return render_template("game3.html", game=is_game_on(game))


@app.route('/info')
def info():
    return render_template("info.html")


if __name__ == "__main__":
    app.run(port=5000)
