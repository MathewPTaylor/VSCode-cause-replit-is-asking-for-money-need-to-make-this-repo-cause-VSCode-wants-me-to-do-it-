class Node:
    def __init__(self, value: int = None) -> None:
        self.value = value
        self.left = None
        self.right = None 
    def __repr__(self):
        return f"Node({self.value}, {self.left}, {self.right})"
        #return f"   ({self.value})\n /\n({self.left})      ({self.right})"



mylist = [2, 4, 5, 6, 3, 1, 7]
counters = 1
root = Node(2)

def add_node(curnode, value):
    #print(curnode)
    if value < curnode.value:
        if curnode.left is not None:
            add_node(curnode.left, value)
        else:
            curnode.left = Node(value)
            #print("added", value)
    else:
        if curnode.right is not None:
            add_node(curnode.right, value)
        else:
            curnode.right = Node(value)
            #print("added", value)

def traverse_in_order(root):
    if root.left is not None:
        traverse_in_order(root.left)

    print(root.value)

    if root.right is not None:
        traverse_in_order(root.right)

def traverse_pre_order(root):
    print(root.value)

    if root.left is not None:
        traverse_pre_order(root.left)
    if root.right is not None:
        traverse_pre_order(root.right)

def traverse_post_order(root):
    if root.left is not None:
        traverse_post_order(root.left)
    if root.right is not None:
        traverse_post_order(root.right)

    print(root.value)


for item in mylist[1:]:
    add_node(root, item)

print("Inorder:")
traverse_in_order(root)
print("\nPre Order:")
traverse_pre_order(root)
print("\nPost Order:")
traverse_post_order(root)



def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(6))