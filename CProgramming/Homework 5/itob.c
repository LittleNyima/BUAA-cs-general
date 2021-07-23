#include <stdio.h>

void itob(signed int n,char s[],int b)
{
	int i=0,j=0;
	int q=0,mod=0;//商与模
	char temp[50]={'\0'};
	if(n<0)
	{
		s[i]='-';
		i=i+1;
		n=0-n;
	}
	while(1)
	{
		q=n/b;
		mod=n%b;
		n=q;
		if(mod<=9)
		{
			mod=mod+48;
		}
		else
		{
			mod=mod+87;
		}
		temp[j]=mod;
		j=j+1;
		if(q==0)
		{
			break;
		}
	}
	while(j>0)
	{
		s[i]=temp[j-1];
		i=i+1;
		j=j-1;
	}
}

int main()
{
	signed int n=0;//整数与基
	int b=0,i=0;
	char s[50]={'\0'};
	scanf("%d",&n);
	scanf("%d",&b);
	itob(n,s,b);
	while(s[i]!='\0')
	{
		printf("%c",s[i]);
		i=i+1;
	}
	return 0;
}

