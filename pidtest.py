import math
import matplotlib.pyplot as plt


class UniformAcceleration:
    dt = 0.01
    total_time = 5

    def __init__(self, initial_velocity=0, acceleration=0):
        self.velocity = initial_velocity
        self.acceleration = acceleration
        self.displacements = []
        self.velocities = []
        self.time_scale = []
    
    def set_dt(cls, new_dt):
        cls.dt = new_dt
    
    def calculate_displacement(self):
        new_distance: float = 0
        distance: float = 0
        n = int(self.__class__.total_time / self.__class__.dt) + 1

        for i in range(n):
            self.time_scale.append(round(i * self.__class__.dt, 2))
            self.displacements.append(new_distance)
            new_distance = distance + (self.velocity * self.__class__.dt) + ((1/2) * self.acceleration * math.pow(self.__class__.dt, 2))
            
            self.velocity += self.acceleration * self.__class__.dt
            distance = new_distance
    

    def simulate(self):
        new_distance: float = 0
        distance: float = 0
        n = int(self.__class__.total_time / self.__class__.dt) + 1

        for i in range(n):
            self.time_scale.append(round(i * self.__class__.dt, 2))
            self.displacements.append(new_distance)
            self.velocities.append(velocity)

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
            self.velocities.append(self.velocity)

            drag = self.calculate_resistance_force() if self.include_air else 0
            self.drags.append(drag)
            self.acceleration = ((self.mass * self.__class__.g) - drag) / self.mass

            self.velocity += self.acceleration * super().dt
    

    def simulate_freefall(self):
        new_distance: float = 0
        distance: float = 0
        n = int(self.__class__.total_time / super().dt) + 1

        for i in range(n):
            self.time_scale.append(round(i * super().dt, 2))
            self.displacements.append(new_distance)
            self.velocities.append(self.velocity)

            drag = self.calculate_resistance_force() if self.include_air else 0
            self.drags.append(drag)
            self.acceleration = ((self.mass * self.__class__.g) - drag) / self.mass
            
            new_distance = distance + (self.velocity * super().dt) + ((1/2) * self.acceleration * math.pow(super().dt, 2))
            self.velocity += self.acceleration * super().dt
            distance = new_distance
    

    def calculate_resistance_force(self):
        force = 1/2 * self.__class__.air_density * math.pow(self.velocity, 2) * self.drag_coefficient * self.surface_area
        return force



system1 = UniformAcceleration(initial_velocity=0, acceleration=1)

class World:
    def __init__(self, dt=0.01):
        self.time_step = dt
        self.objects = []
    
    def add_object(self, obj):
        assert isinstance(obj, Object)
        self.objects.append(obj)
        obj.world = self

class Object:
    def __init__(self, _mass):
        self.mass = _mass
        self.velocity = 0
        self.displacement = 0
        self.world = None
    
    def apply_force(self, force):
        impulse = force * self.world.time_step
        prev_v = self.velocity
        self.velocity = prev_v + impulse / self.mass
        self.displacement += 0.5 * (self.velocity + prev_v) * self.world.time_step
    
    def get_telemetry(self):
        return f"{self.displacement}, {self.velocity}"

class PID:
    def __init__(self, kp, ki, kd): 
        self.target_value = None
        self.current_value = None
        self.delta = None
        self.error = 0
        self.previous_error = None
        self.P_term = 0
        self.I_term = 0
        self.D_term = 0
        self.Kp = kp
        self.Ki = ki
        self.Kd = kd
        self.PID_term = 0


    def set_target(self, value):
        self.target_value = value
    
    def set_current(self, value):
        self.current_value = value

    def set_delta(self, value):
        self.delta = value
        

    def calculate_pid(self):
        self.calculate_error()
        self.calculate_derivative()
        self.calculate_integral()
        self.PID_term = (self.Kp * self.P_term) + (self.Ki * self.I_term) + (self.Kd * self.D_term)
        self.previous_error = self.error


    def calculate_error(self):
        self.error = self.target_value - self.current_value
        
        if self.previous_error is None:
            self.previous_error = self.error

        self.P_term = self.error

    def calculate_derivative(self):
        self.D_term = (self.error - self.previous_error) / self.delta
        # self.D_term = self.current_value / self.delta

    def calculate_integral(self):
        self.I_term += self.error * self.delta
    

engine = World()
car = Object(_mass=40)
engine.add_object(car)

pid_controller = PID(0.5, 0, 0.5)
pid_controller.set_delta(0.01)
pid_controller.set_target(50)
pid_controller.set_current(car.displacement)



time_elapsed = 0
displacements = []
velocities = []
times = []
forces = []
pids = []
xs = []

force = 0
max_force = 100 # N
loop = True
while time_elapsed <= 100:
    # print(car.get_telemetry(), time_elapsed, sep=" : ")
    displacements.append(car.displacement)
    velocities.append(car.velocity)
    times.append(time_elapsed)
    forces.append(force)
    pids.append(pid_controller.PID_term)
    # if displacements == 50:
    #     xs.append(time_elapsed)

    pid_controller.calculate_pid()
    force = pid_controller.PID_term
    # force = max(-max_force, min(max_force, pid_controller.PID_term))

    # print(pid_controller.PID_term, "Force", force)
    car.apply_force(force=force)
    time_elapsed += engine.time_step
    pid_controller.set_current(car.displacement)


# fig, ax = plt.subplots(1, 2)

# ax[0].plot(times, displacements, label="displacement")
# ax[0].plot(times, velocities, label="velocity")
# ax[0].legend()

# ax[1].plot(times, forces, label="force")
# ax[1].plot(times, pids, label="pid")
# ax[1].legend()

plt.xlabel("Time (s)")
plt.ylabel("Displacement (m) / Velocity (m/s)")
# plt.plot(system1.time_scale, system1.displacements)
# plt.plot(system2.time_scale, system2.displacements)
plt.plot(times, displacements, label="displacement")
plt.plot(times, pids, label="pid")
plt.plot(times, forces, label="force")
# plt.plot(human.time_scale, human.velocities)
plt.legend()
plt.show()
plt.savefig("results.png")


