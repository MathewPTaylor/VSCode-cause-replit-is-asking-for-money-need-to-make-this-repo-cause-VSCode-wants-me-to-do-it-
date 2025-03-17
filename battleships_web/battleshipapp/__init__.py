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

from battleshipapp.model import Rooms


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
            return True
    return False


@app.route("/checkGame", methods=["POST"])
def check_handle():
    data_obj = request.get_json()
    room_id = data_obj["GAME_ID"]

    # check if room exists
    room_exist = check_room_exist(room_id)

    if room_exist: # pending room exists
        # add user to room
        # whole shbang
        print("ROOM EXISTS BRUH")
    else:
        new_room = Rooms(room_id=room_id)
        db.session.add(new_room)
        db.session.commit()

    
    return False



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