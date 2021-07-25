def find(x):
    global m
    global cities
    global times
    global end
    global mark
    global total
    times = times + 1
    for i in range(1, n + 1):
        if(cities[x][i] == 1):
            if(i == end):
                total = min(total, times)
            elif(mark[i] == 0):
                mark[i] = 1
                find(i)
    times = times - 1
    mark[x] = 0
    return

n, m = map(int, input().split())
cities = {}
mark = [0] * (n + 1)
times = 0
total = n * n
for i in range(m + 1):
    cities[i]  = {}
for i in range(m + 1):
    for j in range(m + 1):
        cities[i][j] = 0
for i in range(m):
    c1, c2 = map(int, input().split())
    cities[c1][c2] = 1
    cities[c2][c1] = 1
start, end = map(int, input().split())
mark[start] = 1
find(start)
print(total)

