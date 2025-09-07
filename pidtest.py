import math
import matplotlib.pyplot as plt

class UniformAcceleration:
    dt = 0.01
    total_time = 5

    def __init__(self, initial_velocity=0, acceleration=0):
        self.velocity = initial_velocity
        self.acceleration = acceleration
        self.ypos = []
        self.time_scale = []
    
    def set_dt(cls, new_dt):
        cls.dt = new_dt
    
    def calculate_displacement(self):
        new_distance: float = 0
        distance: float = 0
        n = int(self.__class__.total_time / self.__class__.dt) + 1

        for i in range(n):
            self.time_scale.append(round(i * self.__class__.dt, 2))
            self.ypos.append(new_distance)
            new_distance = distance + (self.velocity * self.__class__.dt) + ((1/2) * self.acceleration * math.pow(self.__class__.dt, 2))
            
            self.velocity += self.acceleration * self.__class__.dt
            distance = new_distance


class FreeFall(UniformAcceleration):
    g = 9.81
    air_density = 1.225 # kg/m^3

    def __init__(self, initial_velocity=0, air_resistance=True, drag_co=1, sa=1, _mass=1):
        super().__init__(initial_velocity, self.__class__.g)
        self.include_air = air_resistance
        self.drag_coefficient = drag_co
        self.surface_area = sa # m^2
        self.mass = _mass
        self.drags = []

    def calculate_velocity(self):
        n = int(super().total_time / super().dt) + 1

        for i in range(n):
            self.time_scale.append(round(i * super().dt, 2))
            self.ypos.append(self.velocity)

            drag = self.calculate_resistance_force() if self.include_air else 0
            self.drags.append(drag)
            self.acceleration = ((self.mass * self.__class__.g) - drag) / self.mass

            self.velocity += self.acceleration * super().dt
    

    def calculate_resistance_force(self):
        force = 1/2 * self.__class__.air_density * math.pow(self.velocity, 2) * self.drag_coefficient * self.surface_area
        return force



system1 = UniformAcceleration(initial_velocity=0, acceleration=1)
system2 = UniformAcceleration(initial_velocity=0, acceleration=9.81)

system1.calculate_displacement()
system2.calculate_displacement()
print(system1.ypos)
print(system2.ypos)


human = FreeFall(initial_velocity=0, air_resistance=True, drag_co=1, sa=1.86, _mass=70)
f2 = FreeFall(initial_velocity=0, air_resistance=False, drag_co=1, sa=1)

human.calculate_velocity()
f2.calculate_velocity()
print(human.ypos)

total_time = 10
dt = 0.01
velocity = 0 # m/s
acceleration = 1 # m / s^2
new_distance = 0
distance = 0

ypos = []
time_scale = []

for i in range(int(total_time / dt) + 1):
    time_scale.append(round(i * dt, 2))
    ypos.append(new_distance)
    new_distance = distance + (velocity * dt) + ((1/2) * acceleration * math.pow(dt, 2))
    
    velocity += acceleration * dt
    distance = new_distance

# print(ypos)
# print(time_scale)

print(ypos[-1])
print(time_scale[-1])




plt.xlabel("Time (s)")
plt.ylabel("Velocity (m/s)")
# plt.plot(system1.time_scale, system1.ypos)
# plt.plot(system2.time_scale, system2.ypos)
plt.plot(human.time_scale, human.ypos)
plt.plot(human.time_scale, human.drags)
plt.show()
plt.savefig("results.png")

