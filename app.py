from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("calendario.html")

@app.route("/contactos")
def contactos():
    return render_template("contactos.html")

@app.route("/notas")
def notas():
    return render_template("notas.html")

@app.route("/objetivos")
def objetivos():
    return render_template("objetivos.html")

@app.route("/reuniones")
def reuniones():
    return render_template("reuniones.html")

@app.route("/tareas")
def tareas():
    return render_template("tareas.html")

if __name__ == '__main__':
    app.run(debug=True, port=8080)