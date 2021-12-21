from flask import Flask, render_template
from nastaveni import NASTAVENI, SVETLY, MODRY, CERVENY

app = Flask(__name__)


def urci_barvu(barva):
    for barva_mode in [SVETLY, CERVENY, MODRY]:
        if barva == barva_mode["hlavni"]:
            return barva_mode


def bezi_hra(hra):
    if hra == 0:
        return False
    else:
        return True


@app.route('/')
def domu():
    return render_template("index.html", mode=MODRY["hlavni"], nastaveni=NASTAVENI, napis="Domů", hlavni_barva=MODRY["text_a_pozadi"])


@app.route('/<barva>')
def barevny(barva):
    return render_template("index.html", mode=barva, nastaveni=NASTAVENI, napis="Domů", hlavni_barva=urci_barvu(barva)["text_a_pozadi"])


@app.route('/<barva>/hra1/<int:hra>/<int:rychlost>/<int:predpripravene_kruhy>')
def hra1(barva, hra, rychlost, predpripravene_kruhy):
    barevny_mod = urci_barvu(barva)
    return render_template("hra1.html",
                           hra=bezi_hra(hra), rychlost=rychlost, mode=barevny_mod["hlavni"], barvy_kruhu=barevny_mod["hra1"],
                           nastaveni=NASTAVENI, napis="Vyčisti obrazovku", hlavni_barva=barevny_mod["text_a_pozadi"], predpripravene_kruhy=predpripravene_kruhy)


@app.route('/<barva>/hra2/<int:hra>/<int:rychlost>')
def hra2(barva, hra, rychlost):
    barevny_mod = urci_barvu(barva)
    return render_template("hra2.html",
                           hra=bezi_hra(hra), rychlost=rychlost, mode=barevny_mod["hlavni"], kruhy=barevny_mod["hra2"],
                           nastaveni=NASTAVENI, napis="Stejné barvy", hlavni_barva=barevny_mod["text_a_pozadi"])


@app.route('/<barva>/hra3/<int:hra>')
def hra3(barva, hra):
    barevny_mod = urci_barvu(barva)
    return render_template("hra3.html",
                           hra=bezi_hra(hra), mode=barevny_mod["hlavni"],
                           nastaveni=NASTAVENI, napis="Reakční doba", hlavni_barva=barevny_mod["text_a_pozadi"])


@app.route('/<barva>/info')
def info(barva):
    return render_template("info.html", mode=urci_barvu(barva)["hlavni"], nastaveni=NASTAVENI, napis="Info",
                           hlavni_barva=urci_barvu(barva)["text_a_pozadi"])


if __name__ == "__main__":
    app.run(port=5000)
