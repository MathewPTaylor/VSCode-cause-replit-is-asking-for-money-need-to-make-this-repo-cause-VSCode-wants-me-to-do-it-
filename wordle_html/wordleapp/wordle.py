from random import choice
class Wordle:
    @staticmethod
    def get_daily_word() -> str:
        with open(r"./wordleapp/resources/Word_Bank.txt", "r") as fi:
            return choice(fi.read().splitlines())