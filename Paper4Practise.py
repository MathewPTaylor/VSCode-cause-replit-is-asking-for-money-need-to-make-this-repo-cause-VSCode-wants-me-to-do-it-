# my list indexing will resemble a matrix i.e. [y, x]

ArrayNodes: list = [[-1, -1, -1] for _ in range(20)]

ArrayNodes[0][0] = 1
ArrayNodes[0][1] = 20
ArrayNodes[0][2] = 5

ArrayNodes[1][0] = 2
ArrayNodes[1][1] = 15
ArrayNodes[1][2] = -1

ArrayNodes[2][0] = -1
ArrayNodes[2][1] = 3
ArrayNodes[2][2] = 3

ArrayNodes[3][0] = -1
ArrayNodes[3][1] = 9
ArrayNodes[3][2] = 4

ArrayNodes[4][0] = -1
ArrayNodes[4][1] = 10
ArrayNodes[4][2] = -1

ArrayNodes[5][0] = -1
ArrayNodes[5][1] = 58
ArrayNodes[5][2] = -1

ArrayNodes[6][0] = -1
ArrayNodes[6][1] = -1
ArrayNodes[6][2] = -1

freeNode = 6
rootPointer = 0




def print_array(array):
    for i, node in enumerate(array):
        print(f"{i}: ", node)


def SearchValue(root: int, valueToFind: int) -> int:
    if root == -1:
        return -1
    else:
        if ArrayNodes[root][1] == valueToFind:
            return root
        else:
            if ArrayNodes[root][1] == -1:
                return -1
            # endif
        # endif
    # endif
    if ArrayNodes[root][1] > valueToFind:
        return SearchValue(ArrayNodes[root][0], valueToFind)
    # endif
    if ArrayNodes[root][1] < valueToFind:
        return SearchValue(ArrayNodes[root][2], valueToFind)
    # endif


#print_array(ArrayNodes)
#print(ArrayNodes)
