class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

s = input().split()
'''root = Node()
queue = []
tail = 0
queue.append(root)
sums = 0
for i in s:
    cur = queue[tail]
    if str(i) == 'None':
        cur = None
    else:
        cur.data = int(i)
        cur.left = Node()
        cur.right = Node()
        queue.append(cur.left)
        queue.append(cur.right)
        tail = tail + 1
while(not (root.left == None or root.left.data == None)):
    sums = sums + root.left.data
    root = root.left
print(sums)'''
s = ['0'] + s
i = 2
sums = 0
while(i < len(s)):
    if(s[i] != 'None'):
        sums = sums + int(s[i])
    i = i + 2
print(sums)


