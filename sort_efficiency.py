class SortEfficiency:
    unsorted_array = [1, 4, 5, 6, 7, 8, 33, 98, 789, 65, 76, 54, 2]
    def __init__(self):
        self.iterations = 0

    def BubbleSortCounter(self, array_to_sort) -> list[int]:
        temp: int
        counter: int
        loop: bool = True
        while loop:
            counter = 0
            for i in range(len(array_to_sort) - 1):
                if array_to_sort[i] > array_to_sort[i + 1]:
                    temp = array_to_sort[i]
                    array_to_sort[i] = array_to_sort[i + 1]
                    array_to_sort[i + 1] = temp
                else:
                    counter = counter + 1
                self.iterations += 1
            if counter == len(array_to_sort) - 1:
                loop = False

        return array_to_sort
    
    def BubbleSortSwap(self, array_to_sort) -> list[int]:
        temp: int
        swap: bool
        loop: bool = True
        while loop:
            swap = False
            for i in range(len(array_to_sort) - 1):
                if array_to_sort[i] > array_to_sort[i + 1]:
                    temp = array_to_sort[i]
                    array_to_sort[i] = array_to_sort[i + 1]
                    array_to_sort[i + 1] = temp
                    swap = True
                self.iterations += 1
            if not swap:
                loop = False
        return array_to_sort

    def BubbleSortInefficient(self, array_to_sort) -> list[int]:
        temp: int
        for i in range(len(array_to_sort)):
            for c in range(len(array_to_sort) - 1):
                if array_to_sort[c] > array_to_sort[c + 1]:
                    temp = array_to_sort[c]
                    array_to_sort[c] = array_to_sort[c + 1]
                    array_to_sort[c + 1] = temp 
                self.iterations += 1
        
        return array_to_sort
                               


bubblesortcounter = SortEfficiency()

print(bubblesortcounter.BubbleSortCounter([1, 2, 3, 4, 5, 6, 7, 8, 9, 567, 4, 5, 6, 3, 6, 5, 7, 9, 8]))
print(bubblesortcounter.iterations)