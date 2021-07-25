from math import *
class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

def scan(root):
    if(root == None or root.data == None):
        return
    scan(root.left)
    print(root.data, end = ' ')
    scan(root.right)

s = input().split()
queue = []
root = Node()
queue.append(root)
tail = 0
for i in s:
    cur = queue[tail]
    if i == 'None':
        cur = None
    else:
        cur.data = i
        cur.left = Node()
        cur.right = Node()
        queue.append(cur.left)
        queue.append(cur.right)
    tail = tail + 1
scan(root)

