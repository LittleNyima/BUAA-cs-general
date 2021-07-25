n = int(input(''))
list1 = []
list2 = []
for i in range(0, n):
    list1.append(input(''))
    list2.append(float(input('')))
for i in range(0, n):
    for j in range(0, n-1):
        if list2[j] < list2[j+1]:
            list1[j], list1[j+1] = list1[j+1], list1[j]
            list2[j], list2[j+1] = list2[j+1], list2[j]
for i in range(0,n):
    print(list1[i], end = ', ')
    print('%.2f' % list2[i])

