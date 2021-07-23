#include <stdio.h>
#include <string.h>

int maximum(int wezer[],int longest[],int i);
void isLongest(char str1[],int wezer[],int longest[],int i);
int isMax(int longest[],int slen);

int maximum(int wezer[],int longest[],int i)
{
	int n=0,mxm=0;
	while(n<i)
	{
		if(wezer[n]==2)
		{
			if(longest[n]>mxm)
			{
				mxm=longest[n];
			}
		}
		n=n+1;
	}
	return mxm;
}

void isLongest(char str1[],int wezer[],int longest[],int i)
{
	int n=0,mx=0;
	while(n<i)
	{
		if(str1[n]<=str1[i])
		{
			wezer[n]=2;
		}
		n=n+1;
	}
	n=0;
	mx=maximum(wezer,longest,i);
	while(n<i)
	{
		wezer[n]=0;
		n=n+1;
	}
	longest[i]=mx+1;
}

int isMax(int longest[],int slen)
{
	int max=0,n=0;
	while(n<slen)
	{
		if(longest[n]>max)
			max=longest[n];
		n=n+1;
	}
	return max;
}

int main()
{
	char str1[12000]={'\0'};
	int longest[12000]={0};
	int wezer[12000]={0};
	int i=1,max=0,slen=0;
	gets(str1);
	slen=strlen(str1);
	longest[0]=1;
	while(i<slen)
	{
		isLongest(str1,wezer,longest,i);
		i=i+1;
	}
	max=isMax(longest,slen);
	printf("%d\n",max);
	return 0;
}
