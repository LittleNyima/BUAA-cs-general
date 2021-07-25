from math import *

lst1 = []
lst2 = []

class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

def scan1(root):
    global lst1
    if(root == None or root.data == None):
        return
    if((root.left == None or root.left.data == None) and (root.right == None or root.right.data == None)):
        lst1.append(root.data)
    scan1(root.left)
    scan1(root.right)

def scan2(root):
    global lst2
    if(root == None or root.data == None):
        return
    if((root.left == None or root.left.data == None) and (root.right == None or root.right.data == None)):
        lst2.append(root.data)
    scan2(root.left)
    scan2(root.right)

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
scan1(root)

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
scan2(root)

print(lst1 == lst2)


