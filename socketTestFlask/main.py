from flask import Flask, render_template
from flask_socketio import SocketIO
import colorama
import time

colorama.init(autoreset=True)

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/", methods=["post", "get"])
def index():
    return render_template("index.html")



@socketio.on("connect")
def connect_handle():
    print(f"{colorama.Fore.RED}User connected : [{time.strftime("%d-%m-%y %H:%M:%S",time.gmtime())}]")

@socketio.on("disconnect")
def disconnect_handle():
    print("User disconnected")  

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True, port=5000, use_reloader=True)