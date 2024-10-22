from flask import Flask

app = Flask(__name__)

import wordleapp.wordle as Wordle

daily_word = Wordle.Wordle.get_daily_word()

print(daily_word)

import wordleapp.routes