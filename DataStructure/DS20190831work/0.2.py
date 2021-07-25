n1 = 0
n0 = 0
num = input('')
if num == '0':
    n0 = n0 + 1
elif num == '1':
    n1 = n1 + 1
while num != '-1':
    num = input('')
    if num == '0':
        n0 = n0 + 1
    elif num == '1':
        n1 = n1 + 1
if n1/(n1 +n0) >=0.5:
    print('Yes')
else:
    print('No')
