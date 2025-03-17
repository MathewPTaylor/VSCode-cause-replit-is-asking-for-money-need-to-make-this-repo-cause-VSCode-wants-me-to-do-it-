from battleshipapp import app, socket


if __name__ == "__main__":
    socket.run(app, "0.0.0.0", port=3001, debug=True)