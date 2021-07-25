n = int(input(''))

count = 1

for i in range(0, n):
    st = '0' * n
    st2 = st[:i] + '1' + st[i+1:]
    for j in range(0, n-1):
        print(st2[j], end=' ')
    print(st2[n-1])
