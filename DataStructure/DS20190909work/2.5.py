n = int(input(''))
m = 1
l1 = []
l2 = []
flag = []
k = 0
for i in range(0, n):
    l1.append(int(input('')))
    l2.append(m)
    m = m+1
    flag.append(1)
for i in range(0,n):
    for j in range(0,i):
        if l1[j] <l1[i]:
            flag[j] = 0
for i in range(0,n):
    if flag[i] == 1:
        k = k + 1
print(k)
for i in range(0,n):
    if flag[i] == 1:
        print(l2[i])

