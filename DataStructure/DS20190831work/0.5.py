name = input('')
namelist = name.split()
stdlist = []
for i in namelist:
    stdlist.append(i.capitalize())
if len(stdlist)<=2:
    for i in stdlist:
        print(i, end=' ')
else:
    print(stdlist[0], end= ' ')
    for i in stdlist[1:-1]:
        print(i[0]+'.', end=' ')
    print(stdlist[-1])
