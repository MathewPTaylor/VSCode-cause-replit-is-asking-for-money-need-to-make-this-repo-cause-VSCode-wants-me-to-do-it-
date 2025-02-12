def is_operator(item: str) -> bool:
    return item == "+" or item == "-" or item == "*" or item == "/"

def is_term(item: str) -> bool:
    return item.isalnum()


class Node:
    def __init__(self, _value: str):
        self.value = _value
        self.left: Node = None # Type Node
        self.right: Node = None # Type Node
    
    def __repr__(self):
        return f"Node({self.left}, {self.value}, {self.right})"


class BinaryTree:
    def __init__(self):
        self.root_node: Node = None
        self.list_tree = []
    
    def add_node(self, value):
        # print("VALUE WE TRYNA ADD: ", value)
        if self.root_node is not None:
            # self.__add_node(value, self.root_node, False)
            self.test_add_node(value, self.root_node)
        else:
            self.root_node = Node(value)
    

    def test_add_node(self, value, root) -> bool:
        added = False
        if root.left is None:
            root.left = Node(value)
            added = True
        else:
            if is_operator(root.left.value):
                added = self.test_add_node(value, root.left)
            else:
                added = False
        
        if not added:
            if root.right is None:
                root.right = Node(value)
                added = True
            else:
                if is_operator(root.right.value):
                    self.test_add_node(value, root.right)
                else:
                    added = False
        
        return added

    def __add_node(self, value, root, added):
        if root.left is None: 
            root.left = Node(value)
            added = True
        else:
            if is_operator(root.left.value):
                self.__add_node(value, root.left, added)
                print("haha 5")
                return
                print("oh no ")
        
        if added:
            return
        
        if root.right is None:
            root.right = Node(value)
            added = True
        else:
            if is_operator(root.right.value):
                self.__add_node(value, root.right, added)
    

    def inorder_traversal(self, root):
        if root.left is not None:
            self.inorder_traversal(root.left)
        # print(root.value)
        self.list_tree.append(root.value)
        if root.right is not None:
            self.inorder_traversal(root.right)

    def postorder_traversal(self, root):
        if root.left is not None:
            self.postorder_traversal(root.left)
        if root.right is not None:
            self.postorder_traversal(root.right)
        # print(root.value)
        self.list_tree.append(root.value)


    def __repr__(self):
        return f"{self.root_node}"
        

precedence_dict = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
}

def parse_brackets(expression):
    pass

def parse_no_brackets(expression) -> list[str, list, list]:
    expression_list = expression.split(" ") if type(expression) == str else expression
    lowest_op_index = len(expression_list)
    lowest_op_precedence = 3
    return_symbol: str

    # this shit basically just parsing at this point
    # return operator, left expression, right expression

    for i in range(len(expression_list)):
        if is_operator(expression_list[i]):
            if precedence_dict[expression_list[i]] < lowest_op_precedence:
                lowest_op_index = i
                lowest_op_precedence = precedence_dict[expression_list[i]]
    
    return_symbol = expression_list[lowest_op_index]

    return (return_symbol, expression_list[:lowest_op_index], expression_list[lowest_op_index + 1:])


def yo_recurse_me_dawg(b_tree: BinaryTree, expression):
    # parse big expression
    operator, left_side, right_side = parse_no_brackets(expression)
    # print([operator, left_side, right_side])

    # do smth with the operator
    b_tree.add_node(operator)
    
    # check if left is a term
    if is_term(" ".join(left_side)):
        b_tree.add_node(left_side[0])
        # print("left term", left_side[0])
    else:
        yo_recurse_me_dawg(b_tree, left_side)
    
    # check if right is a term
    if is_term(" ".join(right_side)):
        b_tree.add_node(right_side[0])
        # print("WE GOT A RIGHT TERM", right_side[0])
    else:
        yo_recurse_me_dawg(b_tree, right_side)



if __name__ == "__main__":
    tree = BinaryTree()

    # the_expression = "5 + 6 * 24 + 67 * 98 / 7"
    the_expression = input("Enter expression: ")
    # the_expression = "5 * 6 + 7 + 9 * 5"
    # add the operator
    # parse expressions that arent elemental
    # add the expressions that are elemental (terms)
    yo_recurse_me_dawg(tree, the_expression)
    
    # input()
    # print(tree)

    print("INFIX: ")
    tree.inorder_traversal(tree.root_node)
    print("".join(tree.list_tree))
    print("--------")
    print("POSTFIX (RPN): ")
    tree.list_tree = []
    tree.postorder_traversal(tree.root_node)
    print("".join(tree.list_tree))


                
