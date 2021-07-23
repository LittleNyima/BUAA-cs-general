#include <stdio.h>
int isWithin(int numbers[],int num,int j)
{
	int i=0;
	while(i<j)
	{
		if(num==numbers[i])
			return 1;//表示在
		i=i+1;
	}
	return 0;//表示不在
}

void add(int numbers[],int times[],int num,int j)
{
	int i=0;
	while(i<j)
	{
		if(num==numbers[i])
		{
			times[i]=times[i]+1;
			break;
		}
		i=i+1;
	}
}

void print(int numbers[],int times[],int j)
{
	int i=0,max=0,maxnum=0;
	while(i<j)
	{
		if(times[i]>max)
		{
			max=times[i];
			maxnum=numbers[i];
		}
		i=i+1;
	}
	printf("%d\n",maxnum);
}

int main()
{
	int N=0;//数字个数
	int numbers[10005]={0};
	int times[10005]={0};
	int i=0;//次数计数器
	int j=0;//数组元素个数计数器
	int num=0;
	int judge=2;
	scanf("%d",&N);
	while(i<N)
	{
		scanf("%d",&num);
		judge=isWithin(numbers,num,j);
		if(judge==0)
		{
			numbers[j]=num;
			j=j+1;
		}
		add(numbers,times,num,j);
		judge=2;
		i=i+1;
	}
	print(numbers,times,j);
	return 0;
}


