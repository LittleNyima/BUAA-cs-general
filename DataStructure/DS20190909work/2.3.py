n = int(input(''))
l1 = []
l2 = []
for i in range(0, n):
    [item, amount] = input('').split()
    amount = int(amount)
    if item in l1:
        for i in range(0,len(l1)):
            if item == l1[i]:
                l2[i] = l2[i] + amount
    else:
        l1.append(item)
        l2.append(amount)
n = int(input(''))
for i in range(0, n):
    [item, amount] = input('').split()
    amount = int(amount)
    if item in l1:
        for i in range(0,len(l1)):
            if item == l1[i]:
                l2[i] = l2[i] + amount
    else:
        l1.append(item)
        l2.append(amount)
n = input('')
for i in range(0, len(l1)):
    if n == l1[i]:
        print(l2[i])

