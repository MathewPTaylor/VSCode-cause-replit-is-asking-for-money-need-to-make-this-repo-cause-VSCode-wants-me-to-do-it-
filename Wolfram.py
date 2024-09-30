import turtle
from random import randint, choice
import math

win = turtle.Screen()
win.tracer(1)

class Node:
  node_id = 1
  relation_length = 20
  relation_line_thickness = 1
  relations = []
  nodes = []
  
  def __init__(self, num, pos=None):
    self.nodeNum = num
    self.pos = pos
    self.relations = []
    self.pen = turtle.Pen()
    # self.pen.color(choice(["red", "green", "blue", "yellow", "purple"]))
    #self.pen.hideturtle()
    self.pen.shape("circle")
    self.pen.shapesize(stretch_wid=0.2, stretch_len=0.2)
    #self.pen.penup()
    #self.pen.backward(300)

    Node.node_id += 1
    Node.nodes.append(self)

  @classmethod
  def GenerateNewNode(cls, refNode, relation=True, nodePos=None):
    # instantiating a new node
    newNode = Node(
      num = cls.node_id
    )
    
    # plotting the new node
    cls.nodes[-1].PlotNode(refNode, cls.GenerateRandomPos(refNode.pos, newNode) if nodePos is None else nodePos, relation)

    if relation:
      # adding the new relation to the overall relations list
      cls.relations.append([refNode, newNode])
  
      # adding the new relation to the ref node relations list
      refNode.relations.append(newNode)

      # adding the new relation to the new node relations list
      newNode.relations.append(refNode)

    return newNode

  @classmethod
  def AddRelation(cls, refNode, node2):
    # plotting the new relation
    node2.relation(refNode)

    # adding the new relation to the overall relations list
    cls.relations.append([refNode, node2])

    # adding the new relation to the ref node relations list
    refNode.relations.append(node2)

  @classmethod
  def DeleteRelation(cls, node1, node2):
    for relation in cls.relations:
      if node1 == relation[0] and node2 == relation[1]:
        del relation

      node1.pen.clear()
      node2.pen.clear()
        
  def relation(self, refNode):
    self.pen.goto(refNode.pos)
    self.pen.penup()
    self.pen.goto(self.pos)
    self.pen.pendown()
    
  def PlotNode(self, refNode, nodePos, relation):
    # generate random position for the new node
    # draw a line from the ref node to the new node as the relation
    self.pos = nodePos
    self.pen.penup()
    self.pen.goto(refNode.pos)
    if relation:
      self.pen.pendown()
    self.pen.goto(self.pos)
    self.PlotNodePoint()

  def PlotNodePoint(self):
    self.pen.pendown()
    self.pen.pensize(3)
    self.pen.forward(0.001)
    self.pen.pensize(Node.relation_line_thickness)

  @staticmethod
  def GenerateRandomPos(refNodePos: tuple, newNode) -> tuple:
    # new node is gonna be whatever the length of each connection is, determind by the 'relation_length' class property
    angle = randint(0, 90)
    #angle = choice([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 360])
    newNode.pen.right(angle-90)
    # calculated the position of the new node by using trigonometry (math is actually useful) 
    # relation_length = randint(50, 100)
    #Node.relation_length = randint(50,70)
    xPos = refNodePos[0] + (math.cos(angle) * Node.relation_length)
    yPos = refNodePos[1] + (math.sin(angle) * Node.relation_length)

    return (xPos, yPos)


  @classmethod
  def CheckRelations(cls):
    # this is where we set the relation rule and if its true we make a new node
    # for now we are gonna make a simple rule
    
    print("LENGTH:", len(cls.relations), cls.node_id, cls.node_id//2)
    for i in range(len(cls.relations)):
      node1, node2 = cls.relations[i]
       #= RelationFunction(node1, node2)
      if Node.RelationFunction(node1, node2): # relation rule
        # what happens if the relation rule conditions are met
        print(f"new relation: {node1} & {node2}")
        cls.DeleteRelation(node1, node2)
        node3 = cls.GenerateNewNode(node2)
        cls.AddRelation(node1, node3)
        cls.AddRelation(node2, node3)
        #cls.AddRelation(node1, node2)
        #break
      
  @staticmethod
  def RelationFunction(node1, node2):
    #return True
    #return randint(1, 10) == 1
    return choice((True, False)) and choice((True, False))
      
    #return [True if relation in node2.relations else False for relation in node1.relations] #or node2.nodeNum == 3*node1.nodeNum or node1.nodeNum % 3 == 0

  def __repr__(self):
    return f"{self.nodeNum}({self.pos})"

startNode = Node(Node.node_id, pos=(0, 0))
startNode.PlotNodePoint()

def calculateDistance(node1, node2):
  a = node1.pos[0] - node2.pos[0]
  b = node1.pos[1] - node2.pos[1]

  return math.sqrt((a*a) + (b*b))


n = 20

for i in range(n):
  Node.GenerateNewNode(startNode, False, (randint(-250, 250), randint(-250, 250)))

for i in range(n):
  node1 = Node.nodes[i]
  smallest_distance = calculateDistance(node1, Node.nodes[i+1])
  smallest_index = 0
  # node2 = None
  for c in range(len(Node.nodes)):
    if i != c:
      node2 = Node.nodes[c]
      distance = calculateDistance(node1, node2)
      if distance < smallest_distance:
        smallest_distance = distance
        smallest_index = c
        print(Node.nodes[c])

  #print(node2)
  print(smallest_index)
  
  Node.AddRelation(node1, Node.nodes[smallest_index])
    
    



"""for i in range(200):
  if randint(1, 10) > 1:
    Node.GenerateNewNode(Node.nodes[-1], relation=True)
  else:
    Node.GenerateNewNode(choice(Node.nodes), relation=False)
  for _ in range(len(Node.nodes)//2):
    node1 = choice(Node.nodes)
    node2 = choice(Node.nodes)
    if len(node1.relations) < 3 and len(node2.relations) < 3:
      Node.AddRelation(node1, node2)
"""


win.mainloop()