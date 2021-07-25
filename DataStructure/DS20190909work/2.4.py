n = int(input(''))
m = int(input(''))
l = []
l2 = []
d = dict()
for i in range(0, n):
    l.append(input(''))
for i in l:
    d[i] = 0
for i in l:
    if(d[i]<m):
        l2.append(i)
        d[i] = d[i] + 1
for i in l2:
    print(i)

