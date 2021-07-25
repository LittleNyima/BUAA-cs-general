s = input('')
l = []
for i in range(0,len(s)):
    if s[i] in 'QWERTYUIOPASDFGHJKLZXCVBNM':
        l.append(i)
for i in range(0, len(l)-1):
    print(s[l[i]:l[i+1]].lower(), end='_')
print(s[l[len(l)-1]:].lower())

