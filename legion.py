import matplotlib.pyplot as plt


time_stamps = [0]
battery_pct = [93, 65, 40, 32]


def calc_minutes(root, current):
    root = list(map(int, root.split(":")))
    current = list(map(int, current.split(":")))

    root_hr = root[0]
    crnt_hr = current[0]
    diff_hr = crnt_hr - root_hr

    root_min = root[1]
    crnt_min = current[1]
    diff_min = crnt_min - root_min

    if diff_min < 0:
        diff_hr -= 1
        diff_min = 60 - root_min + crnt_min


    return diff_hr * 60 + abs(diff_min)

for times in ["17:12", "17:45", "17:57"]:
    time_stamps.append(calc_minutes("16:38", times))

print(time_stamps)





def plot_graph(x, y, title="Graph", xlabel="X-axis", ylabel="Y-axis"):
    plt.figure()
    plt.plot(x, y, marker='o')
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.grid(True)
    plt.show()

plt.plot(time_stamps, battery_pct)
plt.savefig("battery.png")



