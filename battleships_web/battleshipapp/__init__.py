from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import SocketIO, join_room, leave_room
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = "suckyourmumontuesdays"

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")
db = SQLAlchemy(app)


from battleshipapp import routes




