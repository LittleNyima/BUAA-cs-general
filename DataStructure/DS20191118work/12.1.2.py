def find(x):
    global inpt
    global mark
    print(x, end = ' ')
    for i in inpt[x].keys():
        if(mark[i] == 0):
            mark[i] = 1
            find(i)
    return

n, m = input().split()
n = int(n)
inpt = {}
mark = {}
for i in range(n):
    inp = input()
    flag = inp[0]
    inpt[flag] = {}
    inp = inp.split(':', 1)[1]
    for j in range(len(inp)):
        if inp[j] == ':':
            inpt[flag][inp[j-1]] = 1
    mark[flag] = 0
mark[m] = 1
find(m)

