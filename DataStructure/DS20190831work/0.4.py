grades = input('')
list = grades.split()
m = int(list[0])
ns = [1]
for i in range(1, len(list)):
    if m < int(list[i]):
        ns = []
        ns.append(i+1)
        m = int(list[i])
    elif m == int(list[i]):
        ns.append(i+1)
for i in ns:
    print(i,end = ' ')
