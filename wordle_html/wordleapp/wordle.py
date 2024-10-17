from random import choice
class Wordle:
    @staticmethod
    def get_daily_word() -> str:
        with open(r"C:\Users\Admin\PycharmProjects\VSCode-cause-replit-is-asking-for-money-need-to-make-this-repo-cause-VSCode-wants-me-to-do-it-\wordle_html\wordleapp\resources\Word_Bank.txt", "r") as fi:
            return choice(fi.read().splitlines())