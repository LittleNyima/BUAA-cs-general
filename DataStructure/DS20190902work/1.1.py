n = 0
lst = []
while True:
    a = input('')
    if a!='':
        a = int(a)
    n = n+1
    if a=='':
        break
    lst.append(a)
if n == 1:
    out3 = lst[0]
else:
    out3 = lst[int(n/2)-1]
for i in range(0, len(lst)-1):
    for j in range(0, len(lst)-1):
        if lst[j] < lst[j+1]:
            tmp = lst[j+1]
            lst[j+1] = lst[j]
            lst[j] = tmp
print(lst[0])
print(lst[-1])
print(out3)
for i in lst:
    print(i, end=' ')

