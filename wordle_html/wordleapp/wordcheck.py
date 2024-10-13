import enum

class ColorCode(enum.IntEnum):
    GREY = 1
    YELLOW = 2
    GREEN = 3

class WordleCheck:
    @staticmethod
    def in_allowed_words(word: str) -> bool:
        with open("/workspaces/VSCode-cause-replit-is-asking-for-money-need-to-make-this-repo-cause-VSCode-wants-me-to-do-it-/wordle_html/wordleapp/resources/valid-wordle-words.txt", "r") as fi:
            x = 0
            file = fi.read().splitlines()
            while x < len(file) and word != file[x]:
                print(file[x])
                x += 1
            
            return x < len(file)
    
    @staticmethod
    def compare_guess(guess: str, daily_word: str) -> list[int, int, int, int, int]:
        comparison_list = []
        
        # finding the number of occurences of each letter of the guess word
        occurence_dict = {}
        for let in daily_word:
            if let not in occurence_dict:
                occurence_dict[let] = 1
            else:
                occurence_dict[let] += 1
        print(occurence_dict)
        
        # main search
        color: int
        for i in range(len(guess)):
            color = ColorCode.GREY
            for c in range(len(daily_word)):
                if guess[i] == daily_word[c] and occurence_dict[guess[i]] > 0:
                    if i == c:
                        color = ColorCode.GREEN
                    else:
                        if color < ColorCode.GREEN:
                            color = ColorCode.YELLOW
            if color > ColorCode.GREY:
                occurence_dict[guess[i]] -= 1
            
            comparison_list.append(color)
        
        return comparison_list
    

print(WordleCheck.compare_guess("lllll", "hello"))


        
        

