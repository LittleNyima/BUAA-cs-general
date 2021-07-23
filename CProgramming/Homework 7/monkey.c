#include <stdio.h>

int isOnly(int monkey[],int n,int m)
{
	int i=0,sum=0,number=0;
	int monkeyi[1000]={0};
	while(i<n)
	{
		if(monkey[i]==m)
		{
			monkeyi[i]=0;
		}
		else
		{
			monkeyi[i]=1;
		}
		i=i+1;
	}
	i=0;
	while(i<n)
	{
		if(monkeyi[i]==1)
		{
			number=i;
		}
		sum=sum+monkeyi[i];
		i=i+1;
	}
	if(sum==1)
	{
		return number+1;
	}
	else
	{
		return -1;
	}
}

int main()
{
	int monkey[1000]={0};
	int n=0,m=0,q=0;
	int i=0,j=1,remain=-1;
	scanf("%d",&n);
	scanf("%d",&m);
	scanf("%d",&q);
	i=q-1;
	while(1)
	{
		if(remain>=0)
		{
			break;
		}
		if(monkey[i]<m)
		{
			monkey[i]=j;
			j=j+1;
			if(j==m+1)
			{
				j=1;
			}
		}
		i=i+1;
		if(i==n)
		{
			i=0;
		}
		remain=isOnly(monkey,n,m);
	}
	printf("%d\n",remain);
	return 0;
}

