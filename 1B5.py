grid = [
    "ABCDE",
    "FGHIK",
    "LMNOP",
    "QRSTU",
    "VWXYZ",
]

convert_dict = {
    "A" : 1,
    "B" : 2,
    "C" : 3,
    "D" : 4,
    "E" : 5
}

message_coords = "(C,4):(C,3):(A,5):(C,2):(C,4):(D,2):(A,5)(C,5):(A,5):(C,3):(D,4):(A,1):(B,2):(C,4)(C,3):(B,4):(D,3):(C,3):(A,5):(E,3):(D,4)"

def solution(message_coordss):
    message = ""
    message_coordss = message_coordss.split(":")
    print(message_coordss)
    for coord in message_coordss:
        message += grid[convert_dict[coord[1]] - 1][int(coord[3]) - 1]
        print(message)
    return message