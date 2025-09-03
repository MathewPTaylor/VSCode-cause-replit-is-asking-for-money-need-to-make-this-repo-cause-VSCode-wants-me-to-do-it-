from battleshipapp import db

class Rooms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.String(20), nullable=False, unique=True)
    no_players = db.Column(db.Integer, nullable=False, unique=False, default=0)
    players = db.relationship("Players", backref="rooms", lazy=True)
    vacant = db.Column(db.Boolean, default=False)
    game = db.relationship("Game", backref="rooms", lazy=True)

    def __repr__(self):
        return f"Room('{self.room_id}')"
    

class Players(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    current_room = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False) # foreign key
    user_sid = db.Column(db.String(20), nullable=True, unique=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    
    def __repr__(self):
        return f"Player({self.username}, ROOM={self.current_room})"



class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # room = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False)
    room = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String, nullable=False) # will be a long JSON object string
    