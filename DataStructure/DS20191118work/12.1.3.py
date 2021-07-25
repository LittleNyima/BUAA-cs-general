def find(x):
    global inpt
    global mark
    global queue
    global head
    global time
    global tail
    for i in range(head, tail):
        for j in inpt[queue[i]].keys():
            queue.append(j)
            mark[j] = 1
    time = time + 1
    head = tail
    tail = len(queue)
    if(0 not in mark.values()):
        return
    find(queue[head])
    return

n, m = input().split()
n = int(n)
inpt = {}
mark = {}
queue = [m]
head = 0
tail = 1
time = 0
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
print(time)


