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

def main():
    s = Stack()
    n = int(input(''))
    q = 0
    for i in range(0,n):
        m = input('')
        if not m in '+DC':
            s.push(int(m))
        elif m == '+':
            top = s.pop()
            p = top + s.top()
            s.push(top)
            s.push(p)
        elif m == 'C':
            s.pop()
        elif m == 'D':
            s.push(2*s.top())
    while not s.isEmpty():
        q += s.pop()
    print(q)

main()


