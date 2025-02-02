from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("plinko.html")



if __name__ == "__main__":
    app.run("0.0.0.0", port=3001, debug=True)