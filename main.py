from flask import Flask, render_template, redirect, url_for, flash, abort

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/hra/1')
def hra1():
    return render_template("game1.html")

@app.route('/hra/2')
def hra2():
    return render_template("game2.html")

@app.route('/hra/3')
def hra3():
    return render_template("game3.html")

@app.route('/info')
def info():
    return render_template("info.html")

if __name__ == "__main__":
    app.run(port=5000)
