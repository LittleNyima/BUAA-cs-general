#include <stdio.h>
#include <string.h>
int main()
{
	char str[241];//定义数组
	int n,m;//定义删数、位数
	int i=0,j=0;//定义位数、次数计数器
	scanf("%s",&str);
	scanf("%d",&n);
	m=strlen(str);
	while(j<n)//删除次数与n比较
	{
		while(str[i]<=str[i+1])
		{
			i=i+1;
		}
		while(i<240)
		{
			str[i]=str[i+1];
			i=i+1;
		}
		i=0;
		j=j+1;
	}
	printf("%s",str);
	return 0;
}
