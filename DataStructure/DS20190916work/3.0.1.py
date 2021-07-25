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
    string = input('')
    if string =='':
        print('No')
        return
    for c in string:
        if c in '(<{[':
            if c == '(':
                s.push(')')
            elif c == '{':
                s.push('}')
            elif c == '[':
                s.push(']')
            else:
                s.push('>')
        else:
            if s.isEmpty():
                print('No')
                return
            else:
                if c == s.top():
                    s.pop()
                else:
                    print('No')
                    return
    if s.isEmpty():
        print('Yes')
    else:
        print('No')
    return

main()

