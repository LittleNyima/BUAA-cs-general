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
    i = 0
    n = int(input(''))
    m = int(input(''))
    s.push(m)
    while True:
        m = int(input(''))
        if m > s.top():
            s.pop()
            s.push(m)
        elif s.size() < n:
            s.push(m)
        if m == 0:
            break
    while not s.isEmpty():
        i += s.pop()
    print(i)

main()

