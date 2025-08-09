from flask import Flask, render_template, request
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
import sys
import json

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['TEMPLATES_AUTO_RELOAD'] = True

socket = SocketIO(app)
db = SQLAlchemy(app)

from battleshipapp.model import Rooms, Players


################
# FLASK ROUTES #
################

@app.route("/", methods=["post", "get"])
def index():
    return render_template("index.html")


def check_room_exist(room_id):
    query = db.select(Rooms)
    rooms = list(db.session.scalars(query))
    print(rooms)
    # check if game id exists (inside the db)
    index: int
    for room in rooms:
        print(room)
        if room_id == room.room_id:
            return room
    return False


###############
# AJAX Routes #
###############

@app.route("/checkGame", methods=["POST"])
def check_handle():
    print("[CHECK GAME START]")
    data_obj = request.get_json()
    room_id = data_obj["ROOM_ID"]

    # check if room exists
    room = check_room_exist(room_id)
    # rooms = db.session.query(Rooms).where()

    if room: # pending room exists
        # add user to room
        # whole shbang
        # redirect user to new room
        print("[CHECK GAME] ROOMSSX", room)
        print("[CHECK GAME] ROOM EXISTS BRUH")
    else:
        new_room = Rooms(room_id=room_id)
        db.session.add(new_room)
        db.session.commit()

        # player = Players(user_id)

    print("[CHECK GAME END]")
    return json.dumps({"RETURN_VAL": False})

def check_name_exist(name):
    names = db.select(Players).where(Players.username == name)
    

@app.route("/checkNameAvailability", methods=["POST"])
def check_name_handle():
    json_data = request.get_json()
    print("[CHECK NAME] JSON DATA", json_data)
    username = json_data.get("USERNAME")
    print("[CHECK NAME] USERNAME", username)

    return json.dumps({"RETURN" : True})


#################
# SOCKET ROUTES #
#################

@socket.on("connect")
def connect_handle(message):
    print("CONNECTED.", file=sys.stderr)

@socket.on("message")
def message_handle(message):
    print("MESSAGE:", message)

@socket.on("checkGame")
def check_handle(data):
    data_obj = json.loads(data)
    print(data_obj)
    game_id = data_obj.get("GAME_ID")

    # check if game id exists (inside the db)
    table_query = db.select(Rooms.id)
    tables = list(db.session.execute(table_query))
    print(tables)