#include <stdio.h>

int stringcmp(char before[],char after[])
{
	int i=0;
	while(i<100)
	{
		if(before[i]>after[i])
		{
			return 1;
		}
		else if(before[i]<after[i])
		{
			return -1;
		}
		i=i+1;
	}
	return 0;
}

void strreverse(char before[],char after[])
{
	int i=strlen(before)-1;
	int j=99;
	while(i>=0)
	{
		after[j]=before[i];
		i=i-1;
		j=j-1;
	}
	i=0;
	while(after[i]=='\0')
	{
		after[i]='0';
		i=i+1;
	}
}

void remove0(char answer[],char output[])
{
	int i=0,j=0;
	while(1)
	{
		if(answer[i]!='0')
		{
			break;
		}
		i=i+1;
	}
	while(i<100)
	{
		output[j]=answer[i];
		j=j+1;
		i=i+1;
	}
}

int main()
{
	char subtracted[100]={'\0'};
	char resubtracted[100]={'\0'};
	char subtracter[100]={'\0'};
	char resubtracter[100]={'\0'};
	char answer[100]={'\0'};
	char output[100]={'\0'};
	int i=99,cmp=0;
	gets(subtracted);
	gets(subtracter);
	strreverse(subtracted,resubtracted);
	strreverse(subtracter,resubtracter);
	cmp=stringcmp(resubtracted,resubtracter);
	if(cmp>0)
	{
		while(i>=0)
		{
			answer[i]=resubtracted[i]-resubtracter[i]+'0';
			i=i-1;
		}
		i=99;
		while(i>=0)
		{
			if(answer[i]<'0')
			{
				answer[i]=answer[i]+10;
				answer[i-1]=answer[i-1]-1;
			}
			i=i-1;
		}
	}
	else if(cmp<0)
	{
		i=99;
		while(i>=0)
		{
			answer[i]=resubtracter[i]-resubtracted[i]+'0';
			i=i-1;
		}
		i=99;
		while(i>=0)
		{
			if(answer[i]<'0')
			{
				answer[i]=answer[i]+10;
				answer[i-1]=answer[i-1]-1;
			}
			i=i-1;
		}
		i=0;
		while(1)
		{
			if(answer[i]!='0')
			{
				answer[i-1]='-';
				break;
			}
			i=i+1;
		}
	}
	else
	{
		printf("0\n");
		return 0;
	}
	remove0(answer,output);
	i=0;
	while(output[i]!='\0')
	{
		printf("%c",output[i]);
		i=i+1;
	}
	printf("\n");
	return 0;
}
