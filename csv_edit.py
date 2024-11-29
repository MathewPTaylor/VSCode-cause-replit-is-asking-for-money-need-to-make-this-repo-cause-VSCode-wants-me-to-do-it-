with open("jail_data.csv", "r") as f:
    lines = f.read().splitlines()


with open("jail_data.csv", "w") as fi:
    for line in lines:
        splits = line.split()
        theline = ", ".join(splits)
        fi.write(theline + "\n")
        