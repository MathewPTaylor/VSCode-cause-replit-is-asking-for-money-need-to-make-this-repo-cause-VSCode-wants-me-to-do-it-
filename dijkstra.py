class Node:
    nodes = []

    def __init__(self, value):
        self.neighbours = []
        self.value = value

        Node.nodes.append(self)
    
    def add_neighbour(self, neighbour, weighting: int):
        self.neighbours.append((neighbour, weighting)) # Type: (Node, int)

    def print_neighbours(self):
        print(f"Neighbours of {self.value}:")
        for neighbour in self.neighbours:
            print(self.value, " -> ", neighbour[0].value, sep="")
    
    def __repr__(self):
        return f"Node({self.value})"


class Edge:
    edges = []

    def __init__(self, node1, node2, weighting):
        self.first_node = node1
        self.other_node = node2
        self.weighting = weighting

        self.initialise_edge()
        Edge.edges.append(self)

    def initialise_edge(self):
        self.first_node.add_neighbour(self.other_node, self.weighting)
        self.other_node.add_neighbour(self.first_node, self.weighting)


A = Node("A")
B = Node("B")
C = Node("C")
D = Node("D")
E = Node("E")
F = Node("F")


Edge(A, B, 4)
Edge(B, C, 5)
Edge(A, C, 6)
Edge(C, E, 3)
Edge(C, F, 9)


def get_obj_node(value):
    x = 0   
    while x < len(Node.nodes):
        if value == Node.nodes[x].value:
            return Node.nodes[x]
        x += 1

def dijkstra(start: str, target: str):
    # set up
    node_dict = {} # stores movement cost from start
    for node in Node.nodes:
        node_dict[node.value] = -1 # -1 is infinity
    
    node_dict[start] = 0

    explored_nodes = []
    explored_nodes.append(get_obj_node(start))
    looking_nodes = []
    current_node = explored_nodes[0]
    movement_cost = 0

    # start of the loop??
    # explore adjacent nodes
    while current_node.value != target:
        for adj, wght in current_node.neighbours:
            if adj in explored_nodes:
                continue

            print("NEIGHBOR", adj.value)
            if wght + movement_cost < node_dict[adj.value] or node_dict[adj.value] <= -1:
                node_dict[adj.value] = movement_cost + wght

            looking_nodes.append(adj)

        lowest = 10000
        lowest_node = None
        index = 0
        for i in range(len(looking_nodes)):
            node = looking_nodes[i]
            if node_dict[node.value] < lowest:
                lowest = node_dict[node.value]
                lowest_node = node
                index = i

        explored_nodes.append(lowest_node)
        looking_nodes.pop(index)
        current_node = lowest_node

        movement_cost = node_dict[lowest_node.value]

        print(current_node)
        print(explored_nodes)
        print(movement_cost)
        
        
    print(node_dict)


dijkstra(A.value, F.value)
print()