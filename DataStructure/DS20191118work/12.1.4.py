def find(x):
    global m
    global n
    global cities
    global times
    global end
    global mark
    global total
    for i in range(1, n + 1):
        if(not cities[x][i] == 0):
            if(i == end):
                times.append(times[-1] + cities[x][i])
                total = min(total, times[-1])
                times.pop()
            elif(mark[i] == 0):
                mark[i] = 1
                times.append(times[-1] + cities[x][i])
                find(i)
    times.pop()
    mark[x] = 0
    return

n, m = map(int, input().split())
cities = {}
mark = [0] * (n + 1)
times = [0]
total = 999999
for i in range(n + 1):
    cities[i]  = {}
for i in range(n + 1):
    for j in range(n + 1):
        cities[i][j] = 0
for i in range(m):
    c1, c2, c3 = map(int, input().split())
    cities[c1][c2] = c3
start, end = map(int, input().split())
mark[start] = 1
find(start)
print(total)

