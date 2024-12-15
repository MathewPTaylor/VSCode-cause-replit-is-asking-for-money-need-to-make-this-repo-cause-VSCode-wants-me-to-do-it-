from turtle import *
import math
import time

class Window:
    width = 600
    height = 600

win = Screen()
win.setup(width=Window.width, height=Window.height)
win.bgcolor("black")
win.tracer(0)



class Vector:
    def __init__(self, mag: float, angle: float):
        self.magnitude = mag
        self.angle = angle
    
    def get_x_component(self):
        radians = self.angle / 180 * math.pi
        return math.cos(radians) * self.magnitude

    def get_y_component(self):
        radians = self.angle / 180 * math.pi
        return math.sin(radians) * self.magnitude
    

    @staticmethod
    def get_angle_cast(x, y):
        opposite = y
        adjacent = x
        angle_correction: float

        if x >= 0:
            angle_correction = 0 if y >= 0 else 360
        else:
            angle_correction = -180 if y < 0 else 180
        

        if adjacent == 0:
            adjacent = 1e-16
        
        angle = math.atan(abs(opposite) / abs(adjacent))

        degrees = abs((angle / math.pi * 180) - angle_correction)

        return degrees
    


    @staticmethod
    def get_magnitude(x, y):
        return math.sqrt(math.pow(x, 2) + math.pow(y, 2))


    @staticmethod
    def add_vector(v1, v2):
        x_sum = v1.get_x_component() + v2.get_x_component()
        y_sum = v1.get_y_component() + v2.get_y_component()

        mag = Vector.get_magnitude(x_sum, y_sum)
        angle = Vector.get_angle_cast(x_sum, y_sum)

        return Vector(mag, angle) 


    def __repr__(self):
        return f"Vector({self.magnitude}, {self.angle}deg)"

class Object:
    objects = []
    stretch = 0.6
    def __init__(self, mass: float, pos: tuple[float, float] = (0, 0), name=None) -> None:
        self.mass = mass
        self.pos = pos
        self.x = pos[0]
        self.y = pos[1]
        self.vector = Vector(0, 0)
        self.name = name

        self.pen = Pen()
        self.pen.shape("circle")
        self.pen.pencolor("white")
        self.pen.fillcolor("white")
        self.pen.shapesize(stretch_wid=Object.stretch, stretch_len=Object.stretch)
        self.pen.penup()
        print(self.pos)
        self.pen.goto(self.pos)
        self.pen.pendown()

        Object.objects.append(self)
    

    def move(self):
        self.x += self.vector.get_x_component()
        self.y += self.vector.get_y_component()
        self.pos = (self.x, self.y)

        self.pen.goto(self.pos)

    @staticmethod
    def calculate_distance(b1, b2) -> float:
        dx = b1.x - b2.x
        dy = b1.y - b2.y
        distance = math.sqrt(math.pow(dx, 2) + math.pow(dy, 2))

        return distance

    def __repr__(self):
        return f"{self.name if self.name is not None else 'Object'}({self.x}, {self.y})"
    

        


# this physics class will perform all the necersarry orbital force calcualtions to make this work.
class Physics:
    G = 10 # 6.11e-11

    @staticmethod
    def calculate_force(b1: Object, b2: Object) -> float:
        force: float
        force = Physics.G * (b1.mass * b2.mass) / math.pow(Object.calculate_distance(b1, b2), 2)
        # F = G * (m1 * m2) / r^2

        return force
    

    @staticmethod
    def calculate_orbit_speed(b1: Object, b2: Object) -> float:
        # b1 will be the body that we are going to find the orbital velocity for
        # b2 will be the body that is influencing b1, b2 is just here so we can calculate the force between b1 and b2
        # F = m(v^2) / r
        # find force
        force = Physics.calculate_force(b1, b2)
        # find distance
        distance = Object.calculate_distance(b1, b2)
        # get mass
        mass = b1.mass
        # calcualte velocity
        v = math.sqrt((force * distance) / mass)
        
        return v

class OrbitSystem:
    time_step = 0.001


# test1 = Object(
#     mass=10000,
#     pos=(0, 0)
# )

# test2 = Object(
#     mass=1000,
#     pos=(-100, 0)
# )

# test3 = Object(
#     mass=1000,
#     pos=(100, 0)
# )

# test4 = Object(
#     mass=1000,
#     pos=(0, 50)
# )


n = 1

sun = Object(333000 / n, (0, 0), "sun")
# mercury = Object(0.2 / n, (20, 0), "mercury")
# venus = Object(0.5 / n, (35, 0), "venus")
earth = Object(100000 / n, (50, 100), "earth")
# mars = Object(0.8 / n, (65, 0), "mars")
# jupiter = Object(1300 / n, (130, 0), "jupiter")
# saturn = Object(1100 / n, (160, 0), "saturn")
# uranus = Object(1000 / n, (190, 0), "uranus")
neptune = Object(1050 / n, (240, 0), "neptune")



# velo = Physics.calculate_orbit_speed(test2, test3)
# dist = velo * OrbitSystem.time_step
# dx = test3.x - test2.x
# dy = test3.y - test2.y
# angle = Vector.get_angle_cast(dx, dy)

# test2.vector = Vector(dist / 2, angle - 90)

# velo = Physics.calculate_orbit_speed(test3, test2)
# dist = velo * OrbitSystem.time_step
# dx = test2.x - test3.x
# dy = test2.y - test3.y
# angle = Vector.get_angle_cast(dx, dy)

# test3.vector = Vector(dist / 2, angle - 90)


# test2.vector = Vector(0, 0)
# test3.vector = Vector(0, 0)

for body in Object.objects[1:]:
    velo = Physics.calculate_orbit_speed(body, sun)
    dist = velo * OrbitSystem.time_step
    dx = sun.x - body.x
    dy = sun.y - body.y
    angle = Vector.get_angle_cast(dx, dy)
    
    body.vector = Vector(dist / 2, angle - 90)


while True:
    for i in range(len(Object.objects)):
        # print(Object.objects[i])

        for c in range(len(Object.objects)):
            if i == c:
                continue

            # print(Object.objects[i], "on", Object.objects[c])

            b1 = Object.objects[i]
            b2 = Object.objects[c]
            force = Physics.calculate_force(b1, b2)
            # print("force", force)
            accel = force / b2.mass
            dist = accel * math.pow(OrbitSystem.time_step, 2)

            dx = b1.x - b2.x
            dy = b1.y - b2.y
            angle = Vector.get_angle_cast(dx, dy)

            dist_vec = Vector(dist, angle)

            b2.vector = Vector.add_vector(b2.vector, dist_vec)

            # print(b2.vector)

            b2.move()


    # for body in Object.objects[1:]:
        
    #     force = Physics.calculate_force(test1, body)
    #     # print("force", force)
    #     accel = force / body.mass
    #     dist = accel * math.pow(OrbitSystem.time_step, 2)

    #     dx = test1.x - body.x
    #     dy = test1.y - body.y
    #     angle = Vector.get_angle_cast(dx, dy)

    #     dist_vec = Vector(dist, angle)

    #     body.vector = Vector.add_vector(body.vector, dist_vec)

    #     # print(body.vector)

    #     body.move()


    time.sleep(0.01)
    win.update()
    # break


win.update()
win.mainloop()