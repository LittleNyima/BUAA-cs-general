//从后向前找可以互换的(m,n),n>m
//当后n位达到倒序交换(倒序排列中比倒数n+1位大的最小的数)与倒数n+1位
//再将后n位恢复正序

#include <stdio.h>

int backNum(int put[],int n)//计算尾端的倒序排列数字个数
{
	int i=1;
	int m=n-1;
	while(m>0)
	{
		if(put[m-1]>put[m])
		{
			i=i+1;
			m=m-1;
		}
		else
			break;
	}
	return i;
}

int minimum(int put[],int n,int m,int mini)//n为n-排列，m为倒序排列的最小下标
{
	int i=n-1;//最大下标
	int min=11;//大于倒数n+1位的最小的数
	int minimumi=0;//min的下标
	while(i>=m)
	{
		if(put[i]<min&&put[i]>mini)
		{
			min=put[i];
			minimumi=i;
		}
		i=i-1;
	}
	return minimumi;
}

void rev(int put[],int n,int i)//进行交换操作
{
	int m=n-1;//最大下标
	int min=n-i;//倒序排列中的最小下标
	int minimumi=0;
	int support=0;
	int temp=0;
	int j=0;
	minimumi=minimum(put,n,min,put[min-1]);
	temp=put[minimumi];
	put[minimumi]=put[min-1];
	put[min-1]=temp;
	j=min;
	while(j<n)
	{
		minimumi=j;
		support=j;
		while(minimumi<n-1)
		{
			while(support<n-1)
			{
				if(put[support]>put[support+1])
				{
					temp=put[support];
					put[support]=put[support+1];
					put[support+1]=temp;
				}
				support=support+1;
			}
			support=j;
			minimumi=minimumi+1;
		}
		j=j+1;
	}
}

void print(int put[],int n)
{
	int i=0;
	printf("%d",put[i]);
	i=i+1;
	while(i<n)
	{
		printf(" %d",put[i]);
		i=i+1;
	}
	printf("\n");
}

int main()
{
	int n=0,i=1;
	int put[10]={1,2,3,4,5,6,7,8,9,10};
	scanf("%d",&n);
	print(put,n);
	while(i!=n)
	{
		i=backNum(put,n);
		rev(put,n,i);
		if(i!=n)
			print(put,n);
	}
	return 0;
}
