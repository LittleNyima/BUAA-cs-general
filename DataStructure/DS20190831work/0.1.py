num = int(input(''))
if num == 0 or num == 1 :
    print('N')
elif num == 2 :
    print('Y')
else :
    k = 0
    for i in range(2, int((num+1)/2)):
        if num % i == 0:
            k = 1
    if k == 0:
        print('Y')
    else:
        print('N')
