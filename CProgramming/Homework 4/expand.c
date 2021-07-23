#include <stdio.h>
void expand(char pre[],char aft[])
{
	int i=0,j=0;//定义读入位置与写入位置
	char mid;//定义转移中间量
	while(pre[i]=='-')//去除最前部-
	{
		aft[j]='-';
		i=i+1;
		j=j+1;
	}
	while(pre[i]!='\0')
	{
		if(pre[i]==' ')
		{
			aft[j]=' ';
			i=i+1;
			j=j+1;
		}
		if((pre[i]>='0')&&(pre[i]<='z'))
		{
			aft[j]=pre[i];
			i=i+1;
			j=j+1;
		}
		if(pre[i]=='-')
		{
			if(pre[i+1]=='-')//连续-的情况
			{
				aft[j]=pre[i];
				i=i+1;
				j=j+1;
				aft[j]=pre[i];
				i=i+1;
				j=j+1;
			}
			if(pre[i-1]>=pre[i+1])//无法延拓的情况
			{
				aft[j]=pre[i];
				i=i+1;
				j=j+1;
			}
			else//可以延拓的情况，主体
			{
				mid=pre[i-1];
				mid=mid+1;
				while(mid<pre[i+1])
				{
					aft[j]=mid;
					j=j+1;
					mid=mid+1;
				}
				i=i+1;
			}
		}
	}
	aft[j]='\0';
}
int main()
{
	char pre[500];
	char aft[500];
	int i=0,j=0;
	gets(pre);
	expand(pre,aft);
	while(aft[j]!='\0')
	{
		printf("%c",aft[j]);
		j=j+1;
	}
	return 0;
}
