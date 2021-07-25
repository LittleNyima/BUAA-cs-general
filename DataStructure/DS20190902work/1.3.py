note = input('')
note = note.lower()
note = note[0].upper() + note[1:]
lst1 = []
lst2 = []
lst3 = []
lst4 = []
for i in range(0, len(note)):
    if note[i]==',':
        lst1.append(i)
        lst4.append(i)
    if note[i]=='.':
        lst2.append(i)
        lst4.append(i)
    if note[i]==' ':
        lst3.append(i)
        lst4.append(i)
for i in range(0, len(lst4)-1):
    if lst4[i]==lst4[i+1]-2 and note[lst4[i]+1]=='i':
        tmp = note[:lst4[i]+1] + 'I' + note[lst4[i]+2:]
        note = tmp
for i in lst2:
    j = i+1
    while True:
        if not j in lst4 and j < len(note):
            tmp = note[:j] + note[j].upper() + note[j+1:]
            note = tmp
            break
        if j > len(note):
            break
        j = j+1
print(note)

