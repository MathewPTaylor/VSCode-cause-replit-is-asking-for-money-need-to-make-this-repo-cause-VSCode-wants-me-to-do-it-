class Stack:
    def __init__(self, length):
        self.stack = [None for _ in range(length + 1)]
        self.start_pointer = 0
        self.end_pointer = -1
    
    def push(self, value):
        # if not full
        # add data 
        # increment
        if self.end_pointer < len(self.stack):
            self.end_pointer += 1
            self.stack[self.end_pointer] = value
        else:
            print("Stack full")
        
    def pop(self) -> str:
        popped_value: str
        if self.end_pointer >= self.start_pointer:
            popped_value = self.stack[self.end_pointer]
            self.end_pointer -= 1
        else:
            print("stack full")
            return "None"
