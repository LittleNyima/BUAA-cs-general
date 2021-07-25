def main():
    n = str(input(''))
    if (len(n) != 18):
        print('NO')
        return
    else:
        for i in range(0,17):
            if (not(n[i]=='0' or n[i]=='1' or n[i]=='2' or n[i]=='3' or n[i]=='4' or n[i]=='5' or n[i]=='6' or n[i]=='7' or n[i]=='8' or n[i]=='9')):
                print('NO')
                return
        i = 17
        if (not(n[i]=='0' or n[i]=='1' or n[i]=='2' or n[i]=='3' or n[i]=='4' or n[i]=='5' or n[i]=='6' or n[i]=='7' or n[i]=='8' or n[i]=='9' or n[i]=='X')):
            print('NO')
            return
        m = 7 * int(n[0]) + 9 * int(n[1]) + 10 * int(n[2]) + 5 * int(n[3]) + 8 * int(n[4]) + 4 * int(n[5]) + 2 * int(n[6]) + 1 * int(n[7]) + 6 * int(n[8]) + 3 * int(n[9]) + 7 * int(n[10]) + 9 * int(n[11]) + 10 * int(n[12]) + 5 * int(n[13]) + 8 * int(n[14]) + 4 * int(n[15]) + 2 * int(n[16])
        m = m % 11
        if (n[17]=='1' and m!=0):
            print('NO')
            return
        if (n[17]=='0' and m!=1):
            print('NO')
            return
        if (n[17]=='X' and m!=2):
            print('NO')
            return
        if (n[17]=='9' and m!=3):
            print('NO')
            return
        if (n[17]=='8' and m!=4):
            print('NO')
            return
        if (n[17]=='7' and m!=5):
            print('NO')
            return
        if (n[17]=='6' and m!=6):
            print('NO')
            return
        if (n[17]=='5' and m!=7):
            print('NO')
            return
        if (n[17]=='4' and m!=8):
            print('NO')
            return
        if (n[17]=='3' and m!=9):
            print('NO')
            return
        if (n[17]=='2' and m!=10):
            print('NO')
            return
        print('YES')
        return

main()

