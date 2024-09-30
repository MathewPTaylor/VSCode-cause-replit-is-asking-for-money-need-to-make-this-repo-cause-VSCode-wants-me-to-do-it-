import math

def find_velocity_sqrd(radius, time_period):
    circumference = 2 * math.pi * radius
    velocity_sqr = math.pow((circumference / time_period), 2)
    # print(velocity_sqr)
    return velocity_sqr

def find_uncertainty(radius, time_period, abs_uncertainty):
    vmax = find_velocity_sqrd(radius, time_period - abs_uncertainty)
    vmin = find_velocity_sqrd(radius, time_period + abs_uncertainty)
    return (vmax - vmin) / 2

n = 2
with open("results.txt", "r") as f:
    for i in range(6):
        radius, time_period, abs_uncertainty = map(float, f.readline().split())
        print(f"{round(find_velocity_sqrd(radius, time_period), n)} ± {round(find_uncertainty(radius, time_period, abs_uncertainty), n)}", sep=" ±")

        

# while input("calculate? (y/n): ") == "y":
#     radius = float(input("enter radius: "))
#     time_period = float(input("enter time: "))
#     abs_uncertainty = float(input("enter absolute uncertainty: "))
#     print(find_velocity_sqrd(radius, time_period), find_uncertainty(radius, time_period, abs_uncertainty))