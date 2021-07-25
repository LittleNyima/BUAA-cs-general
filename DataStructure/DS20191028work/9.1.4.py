from math import *

lstLeft = []
lstRight = []

class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

def scanLeft(root):
    global lstLeft
    if(root.data == None):
        lstLeft.append(None)
        return
    scanLeft(root.left)
    scanLeft(root.right)
    lstLeft.append(root.data)

def scanRight(root):
    global lstLeft
    if(root.data == None):
        lstRight.append(None)
        return
    scanRight(root.right)
    scanRight(root.left)
    lstRight.append(root.data)

s = input().split()
queue = []
root = Node()
queue.append(root)
tail = 0
for i in s:
    cur = queue[tail]
    if False:
        pass
    else:
        cur.data = i
        cur.left = Node()
        cur.right = Node()
        queue.append(cur.left)
        queue.append(cur.right)
    tail = tail + 1
scanLeft(root)
scanRight(root)
if(lstLeft == lstRight):
    print('Yes', end = ' ')
else:
    print('No', end = ' ')
for i in lstLeft:
    if str(i) == 'None':
        continue
    else:
        print(i, end = ' ')

