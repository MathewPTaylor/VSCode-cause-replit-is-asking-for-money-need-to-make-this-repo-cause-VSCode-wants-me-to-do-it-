from battleshipapp import db

class Rooms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.String(20), nullable=False, unique=True)
    no_players = db.Column(db.Integer, nullable=False, unique=False, default=0)
    # players = players will be a relationship
    players = db.relationship("Players", backref="rooms", lazy=True)

    def __repr__(self):
        return f"Room('{self.room_id}')"
    

class Players(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    current_room = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False) # foreign key
    user_sid = db.Column(db.String(20), nullable=False, unique=True)
    username = db.Column(db.String(20), nullable=False, unique=True)

    def __repr__(self):
        return f"Player({self.user_sid}, ROOM={self.current_room})"

