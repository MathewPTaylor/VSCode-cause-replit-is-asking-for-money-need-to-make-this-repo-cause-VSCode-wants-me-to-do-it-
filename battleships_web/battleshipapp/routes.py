from battleshipapp import app, db, socketio
from battleshipapp.model import Rooms, Players
from flask import render_template, request, session, redirect, url_for
import json
import colorama
import time
from flask_socketio import join_room, leave_room, close_room, emit, send

colorama.init(autoreset=True)


################
# FLASK ROUTES #
################

@app.route("/", methods=["post", "get"])
def index():
    return render_template("index.html")


@app.route("/game/<id>", methods=["post", "get"])
def game(id):
    print(f"{colorama.Fore.RED}WHATTTT {id != session.get("ROOM_ID")}")
    if id != session.get("ROOM_ID") and id != "adminyo":
        return redirect(url_for("index")) 

    print(session)
        
    return render_template("game.html", username=session.get("USERNAME"), gid=id)


def check_room_exist(room_id):
    query = db.select(Rooms)
    rooms = list(db.session.scalars(query))
    for room in rooms:
        if room_id == room.room_id:
            return room
    return False


@app.route("/test")
def test():
    return render_template("testgame.html")



###############
# AJAX Routes #
###############

@app.route("/checkGame", methods=["POST"])
def check_handle():
    print(f"{colorama.Fore.RED}[CHECK GAME START]")
    data_obj = request.get_json()
    room_id = data_obj["ROOM_ID"]
    print("ROOM ID:", room_id)

    # check if room exists
    room = check_room_exist(room_id)
    session["ROOM_ID"] = room_id


    if room: # pending room exists
        print(f"{colorama.Fore.GREEN}[CHECK GAME] ROOM EXISTS: {room}")
        
        player = Players(username=session.get("USERNAME"), current_room=room.id)
        db.session.add(player)
        db.session.commit()
    else:
        print("NEW ROOM:", room_id)
        # add room to db
        new_room = Rooms(room_id=room_id)
        db.session.add(new_room)
        db.session.commit()

        # add player to db
        player = Players(username=session.get("USERNAME"), current_room=new_room.id)
        db.session.add(player)
        db.session.commit()



    print(f"{colorama.Fore.RED}[CHECK GAME END]")
    return json.dumps({"RETURN_VAL": False, "CAN_REDIRECT": True if room else False})


def check_name_exist(name):
    query = db.select(Players).where(Players.username == name)
    name = list(db.session.execute(query))

    print("NAMESSS", name)
    return True if name else False


@app.route("/checkNameAvailability", methods=["POST"])
def check_name_handle():
    # get data from frontend
    json_data = request.get_json()
    username = json_data.get("USERNAME")
    print("[CHECK NAME] JSON DATA", json_data)
    print("[CHECK NAME] USERNAME", username)

    # check if name exists in database
    name_exists = check_name_exist(username)
    print("NAME EXIST", name_exists)

    if not name_exists: # unique name
        session["USERNAME"] = username

    return json.dumps({"RETURN" : not name_exists})


def get_room():
    query = db.select(Rooms).where(Rooms.room_id == session.get("ROOM_ID"))
    room = db.session.scalar(query)
    return room


@app.route("/checkPendingRoom", methods=["POST"])
def check_room():
    room = get_room()
    players = room.players

    result = len(players) == 2
    
    return json.dumps({"RESULT": result})

#################
# SOCKET ROUTES #
#################

@socketio.on("connect")
def connect_handle():
    print(f"{colorama.Fore.RED}User Connected: <{request.sid}> [{time.strftime("%d-%m-%y %H:%M:%S", time.localtime())}]")


@socketio.on("disconnect")
def disconnect_hanlde():
    print(f"{colorama.Fore.RED}User Disconnected: [{time.strftime("%d-%m-%y %H:%M:%S", time.localtime())}]")


@socketio.on("message")
def message_handle(message):
    print(f"{colorama.Fore.RED}SOCKET MESSAGE: {message}")


def get_enemy():
    room = get_room()
    players = room.players
    enemies = list(filter(lambda x: x.username != session.get("USERNAME"), players))
    print(enemies)
    return enemies[0].username


@socketio.on("join")
def join_handle(data=None):
    # get room info (DB instance, room id)
    roomDB = get_room()
    room_id = session.get("ROOM_ID")

    # join socket room and send message to acknowledge the join
    join_room(room_id)
    send(f'{session.get("USERNAME")} has entered the room.', to=room_id)
    print(f"{colorama.Fore.GREEN}USER JOINED ROOM:", room_id)
    
    # incrementing db attribute
    roomDB.no_players += 1
    db.session.commit()

    # sending username of self and enemy to the frontend
    emit("namesData", json.dumps({"SELF": session.get("USERNAME"), "ENEMY": get_enemy()}), to=request.sid)

    # logic to know when to start the game
    if roomDB.no_players >= 2:
        # roomDB.vacant = False
        emit("GameStart", to=room_id)

    

@socketio.on("ready")
def ready_handle(data):
    # data will prolly be the board of the ships
    pass




@socketio.on("dummydemo")
def demo_handle():
    # send a game start message
    pass






@socketio.on("checkGame")
def check_handle(data):
    data_obj = json.loads(data)
    print(data_obj)
    game_id = data_obj.get("GAME_ID")

    # check if game id exists (inside the db)
    table_query = db.select(Rooms.id)
    tables = list(db.session.execute(table_query))
    print(tables)


