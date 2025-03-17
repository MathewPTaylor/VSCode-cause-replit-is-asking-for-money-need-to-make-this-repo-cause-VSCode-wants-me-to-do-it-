from flask import Flask, request

app = Flask(__name__)


@app.route("/api/get_weather", methods=["post"])
def get_weather():
    data = request.json()
    print("DATA", data)


if __name__ == "__main__":
    app.run("0.0.0.0", port=3001, debug=True)