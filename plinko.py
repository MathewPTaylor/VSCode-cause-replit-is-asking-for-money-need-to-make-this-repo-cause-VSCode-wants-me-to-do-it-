class Peg:
    def __init__(self, pos: tuple[int, int], val = None):
        self.value = val
        self.pos = pos
   
    def __str__(self):
        return f"Peg({self.value})"
   
    def __repr__(self):
        return f"Peg({self.pos})"

class Board:
    def __init__(self):
        self.board = []
        self.start_pos = (0, 0)
   
    def add_layers(self, n: int, first_layer_no: int = 1):
        temp: list
        for i in range(n):
            temp = []
            for c in range(i + first_layer_no):
                temp.append(Peg(
                    pos = (i, c),
                    val = "⚪"
                    ))
            self.board.append(temp)
       
        self.start_pos = (0, first_layer_no // 2)

    def get_peg(self, y, x):
        return self.board[y-1][x-1]



    def print_board(self):
        n = len(self.board)
        for i in range(n):
            print("  "*(n - i), end="")
            print(*[peg.value for peg in self.board[i]], sep="  ", end="\n")


class Ball:
    def __init__(self, pos):
        self.pos = pos


board = Board()

board.add_layers(10, 3)
print(board.start_pos)
board.print_board()

board.get_peg(4, 3).value = "🟣"

# board.print_board()