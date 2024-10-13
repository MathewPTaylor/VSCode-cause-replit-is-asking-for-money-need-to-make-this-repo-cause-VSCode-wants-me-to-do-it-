from wordleapp import app
from flask import render_template, request, url_for
import json
import wordleapp.wordcheck as Wordle

@app.route("/")
def index():
    print("yoyoyo what down")
    return render_template("index.html")

print("yes routes")

@app.route("/check_guess", methods=["POST"])
def check_guess():
    # return json structure will look smth like this:
    # returnData = {
    #   "isAWord": True,
    #   "guessFeedback": ["GREEN", "YELLOW", "GREY"]
    #   "correctWord": False
    #}

    returnData = {}
    guess = request.get_json()

    # checking if the guess is a word
    isWord = Wordle.WordleCheck.in_allowed_words("".join(guess))

    # comparing between guess and daily word
    comparison = Wordle.WordleCheck.compare_guess(guess, "hello")

    isCorrectWord = sum(comparison) == 15

    returnData["isAWord"] = isWord
    returnData["guessFeedback"] = comparison
    returnData["correctWord"] = isCorrectWord

    print(returnData)

    print(guess)

    return json.dumps(returnData) 





