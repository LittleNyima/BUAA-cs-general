class Stack:
    def __init__(self):
        self._elems = []

    def isEmpty(self):
        return self._elems == []

    def top(self):
        if self._elems == []:
            raise Exception('Stack is empty when using top()!')
        else:
            return self._elems[-1]

    def push(self, elem):
        self._elems.append(elem)

    def pop(self):
        if self._elems == []:
            raise Exception('Stack is empty when doing pop()!')
        else:
            return self._elems.pop()

    def size(self):
        return len(self._elems)

n = int(input(''))
s1 = Stack()
s2 = Stack()
s3 = Stack()
l = []
for i in range(n):
    s1.push(int(input('')))
m = int(input(''))
for i in range(m):
    s = input('')
    if s == 'D':
        while(not s1.isEmpty()):
            s2.push(s1.pop())
        l.append(s2.pop())
        while(not s2.isEmpty()):
            s3.push(s2.pop())
        s1 = s3
        s2 = Stack()
        s3 = Stack()
    else:
        s1.push(int(s))
for i in l:
    print(i)

