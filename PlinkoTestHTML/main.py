from flask import Flask, render_template, json, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("plinko.html")

@app.route("/getArray", methods=["post", "get"])
def array():
    data = request.get_json()
    print("DATA:", data)
    with open("yes.txt", "w") as f:
        for line in data:
            f.write(json.dumps(line) + "\n")
    return "yes"


if __name__ == "__main__":
    app.run("0.0.0.0", port=3001, debug=True)