1.	文件重排
【问题描述】近几年有人提出了这样一种算法，它虽然只是单纯地对文件进行重排，本身并不压缩文件。
该算法如下：对一个长度为n的字符串S，首先根据它构造n个字符串，其中第i个字符串由将S的前i-1个字符置于末尾得到。然后把这n个字符串按照首字符从小到大排序，如果两个字符串的首字符相等，则按照它们在S中的位置从小到大排序。排序后的字符串的尾字符可以组成一个新的字符串S’，它的长度也是n，并且包含了S中的每一个字符。最后输出S’以及S的首字符在S’中的位置p。
【输入文件】输入文件filezip.in包含两行，第1行是一个整数n（1 <=n<=80），代表S的长度，第2行是字符串S。
【输出文件】
输出文件filezip.out包含两行，第1行是S’，第2行是整数p。
【输入样例】
7
example
【输出样例】
xelpame         
7
【样例说明】长度为7的字符串example经转换后变为xelpame，example的首字符在新字符串中的位置是7。

【评分标准】如果你的程序输出正确得20分，每个测试点4分。提交程序名为存file.c。

2.	字符串统计排序
【问题描述】编写一个程序，接收用户输入的一个字符串(可以包含空格)，统计其中所有出现过的所有字符，并按照频率高低的顺序排列输出。频率相同的字符按输入顺序输出。
【输入形式】用户在第一行输入一个字符串，以回车结束输入。
【输出形式】程序统计字符串中出现的所有字符，然后按照字符出现频率大小排序输出，频率相同时，按输入顺序输出。输出形式规定为每行输出4个字符数据，输出格式为：字符-出现次数。每个字符-出现次数输出中间用一个空格分隔，每行末尾没有空格。程序输出结尾有一个回车。
【样例输入】
 The job requires an agile mind.   
【样例输出】
 #-5 e-4 i-3 r-2
 a-2 n-2 T-1 h-1
 j-1 o-1 b-1 q-1
 u-1 s-1 g-1 l-1
 m-1 d-1 .-1               #表示空格(在程序请输出空格，而不是字符’#’，这里只是表示而已。)
【样例说明】用户首先输入字符串The job requires an agile mind. 程序统计完毕之后按照每行4个统计结果输出，字符串中有5个空格，所以输出为#-5,#表示空格。字符’b’和’T’出现次数同为1，因为输入时’b’先于’T’输入，所以输出时也先打印’b’的统计信息。
【评分标准】结果完全正确得20分，每个测试点4分。提交程序名为:frequence.c

3.	加密文件
【问题描述】有一种加密方法为：其使用一个字母串（可以含重复字母，字母个数不超过50）作为密钥。假定密钥单词串为feather，则先去掉密钥单词中的重复字母得到单词串feathr，然后再将字母表中的其它字母以反序追加到feathr的后面：

 f	 e	 a	 t	 h	 r	 z	 y	 x	 w	 v	 u	 s	 q	 p	 o	 n	 m	 l	 k	 j	 i	 g	 d	 c	 b 
加密字母的对应关系如下：

 a	 b	 c	 d	 e	 f	 g	 h	 i	 j	 k	 l	 m	 n	 o	 p	 q	 r	 s	 t	 u	 v	 w	 x	 y	 z
 f	 e	 a	 t	 h	 r	 z	 y	 x	 w	 v	 u	 s	 q	 p	 o	 n	 m	 l	 k	 j	 i	 g	 d	 c	 b
其中第一行为原始英文字母，第二行为对应加密字母。其它字符不进行加密。编写一个程序，用这种密码加密文件。假定要加密的文件名为encrypt.txt及加密后的文件名为output.txt，并假定输入文件中字母全为小写字母，并且输入密钥也全为小写字母。

【输入形式】从标准输入中输入密钥串，并从文件encrypt.txt中读入要加密的内容。
【输出形式】加密后结果输出到文件output.txt中。
【样例输入】
feather
和文件encrypt.txt中内容，例如被加密的文件encrypt.txt中内容为：
c language is wonderful.
【样例输出】加密后output.txt文件中内容为：
a ufqzjfzh xl gpqthmrju.
【样例说明】首先将给定的密钥单词去除重复字母，然后按照上面的加密对应表对encrypt.txt文件内容进行加密即可得到加密后的文件，其中只对英文字母进行加密对换，并且假设encrypt.txt中的英文字母全是小写字母。

【评分标准】该题要求对文件进行加密，共有5个测试点。提交程序名为encrypt.c

4.	程序相似性比较方法（变量）
【问题描述】

程序相似性比较方法之一就是将源程序中无关信息（如变量名、函数名、空白符及注释等）删除后的代码进行比较。编写程序将当前目录下C源文件input.c中的变量名、空白字符删除后写到另一个文件output.c中。

【输入形式】

要处理的C源文件名为input.c，在当前目录下，并假设该文件符合以下条件：
1、程序中只有一个main函数；
2、最多只可能出现一个int类型变量列表（也可能没有），无其它类型变量说明或定义，并且在程序其它地方不会再出现int关键字；
3、定义的int类型变量的个数不超过10个，变量名的长度不超过20个字符；
4、源文件中不含注释；
5、程序没有语法错误；
6、字符串常量中不会出现与变量名相同的串；
7、程序中所有标识符均与其它部分有空格分隔（即可用格式串%s读取），且所有标识符的长度不超过20个字符。

【输出形式】

将源程序文件input.c处理后的结果写入到当前目录下的文件output.c中，输出要求：
1、所有空白字符（包括空格、制表符和回车符）都要删除；
2、定义的int类型变量都要删除，但不删除定义时用到的分隔符’,’；
3、语句中所有int类型变量名都要删除。

【样例输入】

假如input.c文件内容如下：
#include <stdio.h>
main ()
{
     int  a , b , sum ;
     scanf ( "%d%d", & a , & b );
     sum = a + b ;
     printf ( "%d", sum );
}

【样例输出】

output.c内容应为：
#include<stdio.h>main(){int,,;scanf("%d%d",&,&);=+;printf("%d",);}

【样例说明】

在源文件input.c中，int类型的变量有三个：a，b，sum，将程序中所有空白符（空格、制表符、回车符）和变量名a、b、sum删除后，就只剩一行字符串（见output.c中内容）。

提示：
1、可以用fscanf(fp,"%s",str)函数将fp文件中的所有内容以单词串的形式读出，到达文件结尾时该函数返回EOF；
2、可以用strcmp函数比较两个字符串，用strcpy函数拷贝字符串，这两个函数定义在<string.h>头文件中;
3、可通过查找int定义列表找到要删除的单词，即：int单词后（分号之前）的所有单词（逗号除外）都是要删除的变量名。

【评分标准】

该题要求删除源文件中变量、空白符的内容，共有5个测试点。上传C语言文件名为same.c。

5.	查找关键字出现的位置
【问题描述】

查找C源程序文件中控制流关键字（while, for, if）的出现位置。按出现顺序输出其出现的位置（用行数和在该行上第几个字符表示）。要求字符串常量中出现的关键字不应计算，同时该C程序满足下列规定：
1、该程序符合C语言语法要求。
2、双引号只会用在字符串常量中，其它地方不会出现双引号字符"。
3、程序中的所有标识符只由字母和数字组成。
4、程序中没有注释语句。

【输入形式】

C源程序从当前目录下的in.c文件中读入。

【输出形式】

按照出现顺序在标准输出上输出关键字出现的位置，每行输出一个关键字的位置。位置的输出格式是：先输出关键字，后面紧跟着冒号:，然后是用整数表示的行数和在该行上的位置，两整数之间用一个逗号,分隔。

【输入样例1】

假如in.c文件中程序为：
#include <stdio.h>
int main()
{
 int i , n ;
 int a[100];
 scanf ( "%d" , &n );
 for ( i=0 ; i<n ; i++ )
  scanf ( "%d" , &a[i] );
 return 0;
}

【输出样例1】

for:7,2


【样例说明1】

在in.c程序中有一个for。for关键字位于第七行，前面只有一个制表符，所以输出的位置为7,2。

【输入样例2】

假如in.c文件中程序为：
#include <stdio.h>
int main()
{
 int i,n,sum,mul,if1;
 int forAndwhile[100];

 sum=0;mul=1;
 scanf("%d",&n);
 for(i=0;i<n;i++)
  scanf("%d",&forAndwhile[i]);
 for(i=0;i<n;i++)sum+=forAndwhile[i];for(i=0;i<n;i++)mul*=forAndwhile[i];

 i=1;
 if1=forAndwhile[0];
 while (i<n)
 {
  if(if1<forAndwhile[i])
   if1=forAndwhile[i];
 }
 printf("The max of for and while is :%d\n",if1);
 return 0;
}

【输出样例2】

for:9,2
for:11,2
for:11,38
while:15,2
if:17,3

【样例说明2】

在in.c程序中有三个for、一个while和一个if关键字。其中第一个for关键字位于第九行，前面只有一个制表符，所以输出的位置为9,2。注意：字符串常量中出现的for和while不是关键字，所以不应输出。同样，在一些变量名中作为子串出现的if、for和while也不是关键字。

【评分标准】

该题要求按照出现顺序输出关键字出现的位置，共有5个测试点，提交程序文件名为findKeyword.c。

6.	输出文件的末尾行
【问题描述】
命令 tail用来打印文件中最后n行。
命令格式为：tail [-n] filename，其中：
-n ：n表示需要打印的行数，省略时n的值为10。
filename ：给定文件名。
如，命令tail -20 example.txt 表示打印文件example.txt的最后20行，用C语言实现该程序。（提示：使用命令行参数）
【输入形式】
tail [-n] filename，其中：-n ：n表示需要打印的行数，省略时n的值为10。
filename ：给定文件名。
【输出形式】
打印文件filename的最后n行
【输入样例】
命令：tail  -2  tail.in
tail.in文件内容为：
Alcatel provides end-to-end solutions.
It enables enterprises to deliver content to any type of user.
lcatel operates in 130 countries.
Alcatel focus on optimizing their service offerings and revenue streams.
【输出样例】
屏幕将显示：
lcatel operates in 130 countries.
Alcatel focus on optimizing their service offerings and revenue streams.
【样例说明】
使用tail  -2  tail.in输出文件tail.in的最后两行。

注意：文件末尾行有可能没有回车换行。

【评分标准】
如果你的程序输出正确得20分，每个测试点4分。提交程序名为tail.c。