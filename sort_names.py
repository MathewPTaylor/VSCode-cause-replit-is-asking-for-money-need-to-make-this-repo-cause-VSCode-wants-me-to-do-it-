class Record:
    def __init__(self, name, a, b, c, d, e):
        self.name = name
        self.form = a
        self.room = b
        self.bus = c
        self.group = d
        self.teacher = e
    
    def __repr__(self):
        return f"[{self.name}, {self.form}, {self.room}, {self.bus}, {self.group}, {self.teacher}]"

the_list = []
with open("names.txt", "r") as f:
    line: str
    loop = True
    while loop:
        the_list.append(Record(
            name = f.readline().strip(),
            a = f.readline().strip(),
            b = f.readline().strip(),
            c = f.readline().strip(),
            d = f.readline().strip(),
            e = f.readline().strip(),
        ))

        if f.readline() == "":
            loop = False

group_num = input("Group number (1-4): ")
nums = 0

for item in the_list:
    if item.form == "B13":
        print(item)
        nums += 1

print(f"{nums} people")