from battleshipapp import db

class Rooms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.String(20), nullable=False, unique=True)

    def __repr__(self):
        return f"Room('{self.room_id}')"
