from wordleapp import app
from flask import render_template, request, url_for
import json
import wordleapp.wordcheck as Wordle

@app.route("/")
def index():
    return render_template("index.html")

print("yes routes")

@app.route("/check_guess")
def check_guess(guess: str):
    # return json structure will look smth like this:
    # returnData = {
    #   "isAWord": True,
    #   "guessFeedback": ["GREEN", "YELLOW", "GREY"]
    #   "correctWord": False
    #}
    request.form.get("")
    print(guess)
    print(Wordle.in_allowed_words(guess)) 





