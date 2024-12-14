from random import randint
arr = []

def random_elements(_list: list, n: int = 10) -> None:
    for i in range(n):
        _list.append(randint(1, 100))

def insertion_sort(list_to_sort: list) -> None:
    t_index: int
    temp: int
    for i in range(1, len(list_to_sort)):
        t_index = i
        while list_to_sort[t_index] < list_to_sort[t_index - 1]:
            temp = list_to_sort[t_index]
            list_to_sort[t_index] = list_to_sort[t_index - 1]
            list_to_sort[t_index - 1] = temp

            if t_index > 1:
                t_index = t_index - 1


def binary_search(value: int, list_to_search: list) -> None:
    print("YY", list_to_search)
    bottom: int = 0
    top: int = len(list_to_search) - 1
    mid: int = (bottom + top) // 2
    print(mid)
    counter: int = 0
    while bottom <= top:
        if list_to_search[mid] == value:
            return mid
        
        if list_to_search[mid] > value:
            top = mid - 1
        else:
            bottom = mid + 1
        
        mid = (bottom + top) // 2
        print(mid)
        counter += 1
        print(counter, "COUNTER")

    return -1
def binary_search_2(array, target):
    left = 0
    right = len (array) - 1
    counter: int = 0
    while (left <= right):
        mid = (right + left) // 2

        if array[mid] == target:
            return mid
        elif array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
        
        counter += 1

    print(counter, "COUNTTT")
    return -1



random_elements(arr)

print("Before: ", arr)

insertion_sort(arr)

print("After: ", arr)


print("THE INDEX", binary_search(int(input()), arr))

print(binary_search_2(arr, int(input())))


