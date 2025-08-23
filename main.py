from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/tilt')
def tilt():
    return render_template("tilt.html")


if __name__ == "__main__":
    app.run('0.0.0.0', port=81, debug=True, use_reloader=True)