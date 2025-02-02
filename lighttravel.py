from turtle import *
from random import randint
import time

class Window:
    width = 500
    height = 500

win = Screen()
win.setup(width=Window.width, height=Window.height)
win.bgcolor("black")
win.tracer(0)


class Star:
    stretch = 0.3
    stars = []
    def __init__(self, pos, z):
        self.pos = pos
        self.x = pos[0]
        self.y = pos[1]
        self.z = z

        self.pen = Pen()
        self.pen.pencolor("white")
        self.pen.shape("circle")
        self.pen.fillcolor("white")
        self.pen.shapesize(stretch_len=Star.stretch, stretch_wid=Star.stretch)
        self.pen.penup()
        self.pen.goto(self.pos)


        Star.stars.append(self)
    
    def move(self):
        dy = self.y * (self.z / window_height())
        dx = self.x * (self.z / window_width())

        self.x += dx
        self.y += dy
        self.pos = (self.x, self.y)

        self.pen.pendown()
        self.pen.goto(self.pos)
        self.pen.clear()

        if abs(self.x) > Window.width or abs(self.y) > Window.height:
            self.rebirth()
    

    def rebirth(self):
        x = randint(-200, 200)
        y = randint(-200, 200)
        z = randint(5, 15)

        self.x = x
        self.y = y
        self.z = z
        self.pos = (x ,y)



n = 50

for i in range(n):
    x = randint(-Window.width // 2, Window.width // 2)
    y = randint(-Window.height // 2, Window.height // 2)
    z = randint(5, 15)

    Star(
        pos=(x, y),
        z=z
    )


while True:
    for star in Star.stars:
        star.move()
    
    win.update()
    time.sleep(0.01)


win.update()
win.mainloop()