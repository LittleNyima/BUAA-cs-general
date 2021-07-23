1.	多项式相乘
【问题描述】

编写一个程序实现两个一元多项式相乘。

【输入形式】

首先输入第一个多项式中系数不为0的项的系数和指数，以一个空格分隔。且该多项式中各项的系数均为0或正整数，系数和最高幂次不会超过int类型的表示范围。对于多项式 anxn +a n-1 x n-1 + … + a1x1 + a0x0 的输入方法如下：
an  n  a n-1  n-1 …  a1  1  a0  0 
即相邻两个整数分别表示表达式中一项的系数和指数。在输入中只出现系数不为0的项。最后一项的指数后没有空格，只有一个回车换行符。
按照上述方式再输入第二个多项式。

【输出形式】

将运算结果输出到屏幕。将系数不为0的项按指数从高到低的顺序输出，每次输出其系数和指数，均以一个空格分隔，最后一项的指数后也可以有一个空格。

【样例输入】

10 80000 2 6000 7 300 5 10 18 0
3 6000 5 20 8 10 6 0

【样例输出】

30 86000 50 80020 80 80010 60 80000 6 12000 21 6300 10 6020 31 6010 66 6000 35 320 56 310 42 300 25 30 130 20 174 10 108 0

【样例说明】

输入的两行分别代表如下表达式：
10x80000 + 2x6000 + 7x300 + 5x10 + 18
3x6000 + 5x20 + 8x10 + 6
相乘结果为：
30x86000 + 50x80020 + 80x80010 + 60x80000 + 6x12000 + 21x6300 + 10x6020 + 31x6010 + 66x6000 + 35x320 + 56x310 + 42x300 + 25x30 + 130x20 + 174x10 + 108

提示：利用链表存储多项式的系数和指数。

【评分标准】

该题要求输出相乘后多项式中系数不为0的系数和指数，共有5个测试点。上传C语言文件名为multi.c。

2.	统计整数
【问题描述】
输入若干个整数，统计出现次数最多的那个整数。如果出现最多的整数有两个以上，打印最早输入的那个整数。
【输入形式】
从标准输入读取输入。第一行只有一个整数N（1<=N<=10000），代表整数的个数。以后的N行每行有一个整数。
【输出形式】
向标准输出打印出现次数最多的那个整数。
【输入样例】
6
11
0
-1
20
0
300
    【输出样例】
0

【样例说明】
输入6个整数，其中出现次数最多的是0，共出现两次。
【评分标准】
本题不准使用数学库函数。运行时限1秒，正确得20分，每个测试点4分，提交程序名为count.c。

3.	单词索引
【问题描述】

对输入的一篇文档，统计出现的所有单词及其所在行号和列号，即生成类似于词典的单词索引。将其结果以规定格式输出。

【输入形式】

程序从文件crossin.txt读入一篇文档。该文档由若干行组成，每行中包含一系列单词。
行号和列号由1开始计数。该文档中单词总量不确定，每个单词长度最大不超过100个字符。

【输出形式】

将输入文档中所有出现的单词及其所在行号和列号输出到文件crossout.txt中。
输出有若干行，每一行都是文档中出现的一个单词。按如下规格输出： 
word:(line1,colm1),(line2,colm2), … ,(lineN,colmN)
其中word是单词，后面紧跟一个冒号，然后是以逗号隔开的出现的行号和列号(line1,colm1),(line2,colm2)，等等。在该行上各字符紧密输出，不使用空格分隔。在输出时遵循以下规定：
1. 只输出所有由英文字母（包括连字符）构成的单词，数字或包含其它特殊字符的单词不用输出，而且连字符不能作为单词首字符。先输出大写A—Z开头的字符，再输出小写a—z开头的字符。
2. 各单词后面的行号和列号从小到大排列。
3. 统计的单词不包括如下四个单词：
           a
           an
           the
           and

【样例输入】

Alcatel provides end-to-end solutions.
It enables enterprises to deliver content to any type of user.
lcatel operates in 130 countries.
Alcatel focus on optimizing their service offerings and revenue streams.

【样例输出】

Alcatel:(1,1),(4,1)
It:(2,1)
any:(2,46)
content:(2,35)
countries:(3,24)
deliver:(2,27)
enables:(2,4)
end-to-end:(1,18)
enterprises:(2,12)
focus:(4,9)
in:(3,17)
lcatel:(3,1)
of:(2,55)
offerings:(4,43)
on:(4,15)
operates:(3,8)
optimizing:(4,18)
provides:(1,9)
revenue:(4,57)
service:(4,35)
solutions:(1,29)
streams:(4,65)
their:(4,29)
to:(2,24),(2,43)
type:(2,50)
user:(2,58)

【评分标准】
该题要求生成所指定文件的单词索引，提交程序名为index.c。

4.	学生记录
  【问题描述】
  从键盘中读入最多不超过50个学生的学生信息（包括空格隔开的姓名、学号、年龄信息，以学号从低到高排序）
  【输入形式】
  每次键盘读入最多不超过50个学生的学生信息：
  第一行为学生人数；
  后面每一行为空格隔开的学生学号、姓名、年龄，其中学号和年龄都是整数。
  【输出形式】
  分别以姓名顺序（从低到高）和年龄顺序（从低到高）将学生信息输出，每行输出一位学生的信息，其中学号占3位，姓名（英文）占6位，年龄占3位，均为右对齐。年龄相同时按姓名从低到高排序。两种顺序的输出结果用一行空行相隔。
  【输入样例】
  4
  1 aaa 22
  45 bbb 23
  54 ddd 20
  110 ccc 19
  【输出样例】
     1    aaa     22       
    45     bbb     23     
  110     ccc     19
    54     ddd     20                                      

110     ccc     19       
  54     ddd     20        
    1     aaa     22       
  45     bbb     23                           
【样例说明】
从键盘输入四个学生记录，分别按姓名和年龄排序并输出。
【评分标准】
分别以姓名顺序和年龄顺序输出学生信息，完全正确得20分，每个测试点4分，提交程序名为students.c。

5.	猴子选大王
【问题描述】要从n只猴子中选出一位大王。它们决定使用下面的方法：
n只猴子围成一圈，从1到n顺序编号。从第q只猴子开始，从1到m报数，凡报到m的猴子退出竞选，下一次又从退出的那只猴子的下一只开始从1到m报数，直至剩下的最后一只为大王。请问最后哪只猴子被选为大王。
【输入形式】控制台输入三个整数n，m，q。
【输出形式】输出最后选为大王的猴子编号。
【样例输入】
7  4  3
【样例输出】
4
【样例说明】输入整数n ＝ 7，m ＝ 4，q ＝ 3，输出4
【评分标准】本题要求输出最后被选为大王的猴子编号，完全正确得20分，每个测试点4分。上传C语言文件名为monkey.c。

6.	电话薄排序
【问题描述】编写一个程序，输入N个用户的姓名和电话号码，按照用户姓名的词典顺序排列输出用户的姓名和电话号码。
【输入形式】用户首先在第一行输入一个正整数，该正整数表示待排序的用户数目，然后在下面多行输入多个用户的信息，每行的输入格式为：姓名 电话。以回车结束每个用户的输入。
【输出形式】程序输出排序后的结果。每行的输出结果格式也是： 姓名 电话。姓名和电话字段中间没有空格，要求用户姓名不能超过10个字符，超出10个字符时候只取前10个字符作为姓名。电话号码不能超过10位，超过10位时只按10位处理。输出姓名、电话字段各占12个字符宽，输出格式采用默认对齐方式。另外，用户的数量要求不超过50个。
【样例输入】
3
amethystic 1234567
amethyst 654321
wangwei 7645434
【样例输出】
####amethyst######654321
##amethystic#####1234567
#####wangwei#####7645434
【样例说明】程序根据用户姓名的词典顺序排序，最后按照姓名#电话的格式输出。另外，由于规定姓名和电话之间用空格分割，所以输入姓名时请将姓和名一起输入，中间不要有空格。另外输出时候程序将自动补齐12字符宽。程序输出结尾有个回车符。
【评分标准】完全正确为20分，每个测试点4分。提交程序文件名为telsort.c