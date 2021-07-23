#include <stdio.h>

int iswithin(char characters[],char a)
{
	int i=0;
	while(characters[i]!='\0')
	{
		if(a==characters[i])
		{
			return i;
		}
		i=i+1;
	}
	return -1;
}

void sortlist(char characters[],int times[])
{
	int i=0;
	int j=0;
	int ntemp=0;
	char ctemp='\0';
	while(characters[i]!='\0')
	{
		while(characters[j]!='\0')
		{
			if(times[j]<times[j+1])
			{
				ntemp=times[j];
				times[j]=times[j+1];
				times[j+1]=ntemp;
				ctemp=characters[j];
				characters[j]=characters[j+1];
				characters[j+1]=ctemp;
			}
			j=j+1;
		}
		i=i+1;
		j=0;
	}
}

void print(char characters[],int times[])
{
	int i=0,j=0;
	while(characters[i]!='\0')
	{
		if(j==0)
		{
			printf("%c-%d",characters[i],times[i]);
			i=i+1;
			j=j+1;
		}
		else if(j>=1&&j<=2)
		{
			printf(" %c-%d",characters[i],times[i]);
			i=i+1;
			j=j+1;
		}
		else if(j==3)
		{
			printf(" %c-%d\n",characters[i],times[i]);
			i=i+1;
			j=0;
		}
	}
}

int main()
{
	char characters[140]={'\0'};
	char line[300]={'\0'};
	int times[140]={0};
	int i=0,camount=0;
	int within=0;
	gets(line);
	while(line[i]!='\0')
	{
		within=iswithin(characters,line[i]);
		if(within==-1)
		{
			characters[camount]=line[i];
			times[camount]=times[camount]+1;
			camount=camount+1;
		}
		else
		{
			times[within]=times[within]+1;
		}
		i=i+1;
	}
	sortlist(characters,times);
	print(characters,times);
	return 0;
}
