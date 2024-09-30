import math

def find_velocity_sqrd(radius, time_period):
    circumference = 2 * math.pi * radius
    velocity_sqr = (circumference / time_period)^2
    return velocity_sqr

def find_uncertainty(radius, time_period, abs_uncertainty):
    vmax = find_velocity_sqrd(radius, time_period - abs_uncertainty)
    vmin = find_velocity_sqrd(radius, time_period + abs_uncertainty)
    return (vmax + vmin) / 2


for i in range(6):
    radius = float(input("enter radius: "))
    time_period = float(input("enter time: "))
    abs_uncertainty = float(input("enter absolute uncertainty: "))
    print(find_velocity_sqrd(radius, time_period))
    print(find_uncertainty(radius, time_period, abs_uncertainty))