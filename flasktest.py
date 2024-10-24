from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("decay.html")


@app.route("/rordor")
def rordor():
    return render_template("rordor.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81, debug=True, auto_reload=True)