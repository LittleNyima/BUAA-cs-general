#include <stdio.h>
int main()
{
	int n,i=0;//定义矩阵的秩n与计数器i
	int s[100];
	int temp=0;//定义中间量
	char op;//定义运算符
	scanf("%d",&n);
	while(i<(n*n))
	{
		scanf("%d",&s[i]);
		i=i+1;
	}
	i=0;
	scanf("%c",&op);
	while(op!='#')
	{
		if(op=='+')
		{
			while(i<(n*n))
			{
				scanf("%d",&temp);
				s[i]=s[i]+temp;
				i=i+1;
			}
			i=0;
		}
		if(op=='-')
		{
			while(i<(n*n))
			{
				scanf("%d",&temp);
				s[i]=s[i]-temp;
				i=i+1;
			}
			i=0;
		}
		scanf("%c",&op);
	}
	while(i<(n*n))
	{
		printf("%5d",s[i]);
		i=i+1;
		if(i%n==0)
		{
			printf("\n");
		}
	}
	return 0;
}
