class WordleCheck:
    def in_allowed_words(word: str) -> bool:
        with open("./static/media/valid-wordle-words", "r") as fi:
            for line in fi:
                print(line)
