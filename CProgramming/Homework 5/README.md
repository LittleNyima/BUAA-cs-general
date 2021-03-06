1.	凸多边形面积
【问题描述】给出平面上一组顶点的坐标，计算出它们所围成的凸多边形的面积。
【输入形式】从标准输入读取顶点坐标。格式为：第一行是点的个数N（3≤N≤15），后面紧接着N行，每行两个数字 （由空格隔开），分别表示该点的X、Y坐标（0≤X，Y≤32767）。所有点的坐标互不相同，且按顺时针次序给出。
输入数据确保该多边形是一个凸多边形。
【输出形式】向标准输出打印一个浮点数，是该多边形的面积。该浮点数保留两位小数。
【输入样例】 4                                                             
3　3
3　0
1　0
1　2

![image001(3)](assets/image001(3).gif)


【输出样例】
5.00
【样例说明】输入数据表示了如图所示的四边形。其面积为5.00。

提示：求三角形面积可用海伦公式，求平方根可用<math.h>头文件中定义的sqrt函数。
【评分标准】结果完全正确得20分，每个测试点4分。提交程序名为：points.c。

2.	整数的N进制字符串表示
【问题描述】编写函数itob(n,s,b),用于把整数n转换成以b为基的字符串并存储到s中.   编写程序,使用函数itob(n,s,b)将输入的整数n,转换成字符串s,将s输出.转换后的字符串从最高的非零位开始输出。如果n为负数，则输出的字符串的第一个字符为’-’。b为大于1小于37的任意自然数值。当b=2时，输出字符只可能是’0’和’1’；当b=16时，输出字符串中可能含有字符为’0’-’9’，’a’-’f’(字母以小写输出)。b还可以是其它数值。比如输入n=33,b=17，则输出33的17进制值为"1g"。
【输入形式】控制台输入整数n和b，其中n可以为负数。n和b以空格分隔.
【输出形式】控制台输出转化后的字符串s.
【样例输入】5 2
【样例输出】101
【样例说明】5的二进制就是101
【评分标准】结果完全正确得20分，每个测试点4分。提交程序名为：itob.c

3.	求两组整数的异或集
【问题描述】

从标准输入中输入两组整数(每行不超过20个整数，每组整数中元素不重复),合并两组整数，去掉在两组整数中都出现的整数，并按从大到小顺序排序输出（即两组整数集“异或”）。


【输入形式】

首先输入第一组整数，以一个空格分隔各个整数；然后在新的一行上输入第二组整数，以一个空格分隔，行末有回车换行。


【输出形式】

按从大到小顺序排序输出合并后的整数集（去掉在两组整数中都出现的整数，以一个空格分隔各个整数）。


【样例输入】


5 1 4 32 8 7 9 -6
5 2 87 10 1


【样例输出】

87 32 10 9 8 7 4 2 -6


【样例说明】

第一组整数为5   1   4   32   8   7   9   -6，第二组整数分别为5   2   87   10   1。将第一组和第二组整数合并（去掉在两组整数中都出现的整数5和1），并从大到小顺序排序后结果为87   32   10   9   8   7   4   2   -6。


【评分标准】该题要求输出两组整数的异或集，共有5个测试点，提交程序文件名为xor.c。

4.	合并字符串
【问题描述】
编写一个函数void  str_bin(char str1[ ], char str2[ ])， str1、str2是两个有序字符串（其中字符按ASCII码从小到大排序），将str2合并到字符串str1中，要求合并后的字符串仍是有序的，允许字符重复。在main函数中测试该函数：从键盘输入两个有序字符串，然后调用该函数，最后输出合并后的结果。
【输入形式】
分行从键盘输入两个有序字符串（不超过100个字符）
【输出形式】
输出合并后的有序字符串
【输入样例】
aceg
bdfh
【输出样例】
abcdefgh
【样例说明】
输入两个有序字符串aceg和bdfh，输出合并后的有序字符串abcdefgh
【评分标准】
结果完全正确得20分，每个测试点4分，提交程序文件名为combine.c。

5.	超长正整数的减法
【问题描述】
编写程序实现两个超长正整数（每个最长80位数字）的减法运算。

【输入形式】

从键盘读入两个整数，要考虑输入高位可能为0的情况（如00083）。
1. 第一行是超长正整数A；
2. 第二行是超长正整数B；

【输出形式】
输出只有一行，是长整数A减去长整数B的运算结果，从高到低依次输出各位数字。要求：若结果为0，则只输出一个0；否则输出的结果的最高位不能为0，并且各位数字紧密输出。
 【输入样例】

234098
134098703578230056

【输出样例】
 －134098703577995958

【样例说明】
进行两个正整数减法运算， 234098 －134098703578230056 = －134098703577995958。

【评分标准】
 完全正确得20分，每个测试点4分，提交程序文件名为subtract.c。

6.	字符串替换（新）
【问题描述】

编写程序将一个指定文件中某一字符串替换为另一个字符串。要求：（1）被替换字符串若有多个，均要被替换；（2）指定的被替换字符串，大小写无关。

【输入形式】

给定文件名为filein.txt。从控制台输入两行字符串（不含空格，行末尾都有回车换行符），分别表示被替换的字符串和替换字符串。

【输出形式】

将替换后的结果输出到文件fileout.txt中。

【样例输入】

从控制台输入两行字符串：

in

out

文件filein.txt的内容为：

```
#include <stdio.h>

void main()

{

    FILE * IN;

    if((IN=fopen("in.txt","r"))==NULL)

    {

       printf("Can’t open in.txt!");

       return;

    }

    fclose(IN);

}
```

【样例输出】

文件fileout.txt的内容应为：

```
#outclude <stdio.h>

void maout()

{

    FILE * out;

    if((out=fopen("out.txt","r"))==NULL)

    {

       prouttf("Can’t open out.txt!");

       return;

    }

    fclose(out);

}
```

【样例说明】

输入的被替换字符串为in，替换字符串为out，即将文件filein.txt中的所有in字符串（包括iN、In、IN字符串）全部替换为out字符串，并输出保存到文件fileout.txt中。

【评分标准】

该题要求得到替换后的文件内容，共有5个测试点。上传C语言文件名为replace.c。

7.	最长升序子串（选做，不计分）
【问题描述】输入一行字符串，该字符串只由小写英文字母a-z组成，且其中的字符可以重复，最长不超过10000个字符。
从该字符串中按顺序挑选出若干字符（不一定相邻）组成一个新串，称为“子串”。如果子串中每两个相邻的字符或者相等，或者后一个比前一个大，则称为“升序子串”。编程求出输入字符串的最长升序子串的长度。
例如，由输入字符串abdbch可以构成的升序子串有：abd、abch、bbch、abbch等。其中最长的升序子串是abbch，其长度为5。
【输入形式】从标准输入读取一行字符串，该串不含空格，以回车符结束。
【输出形式】向标准输出打印一个正整数，是字符串中最长的升序子串的长度，在行末要输出一个回车符。
【输入样例】abdbch
【输出样例】5
【样例说明】abdbch中最长子串是abbch，长度是5。
【评分标准】结果完全正确得20分，每个测试点4分。上传c语言源程序为up.c。