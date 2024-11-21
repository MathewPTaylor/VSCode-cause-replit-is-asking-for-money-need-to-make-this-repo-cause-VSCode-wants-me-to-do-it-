intensity = 600
efficiency = 0.5
time = 60
latent_fusion = 334000
density = 917

energy = intensity * efficiency * time

# Q = m * L
mass = energy / latent_fusion

volume = mass / density

height = volume / 1

print(height, height * 1000)