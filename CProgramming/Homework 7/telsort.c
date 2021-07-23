#include <stdio.h>
#include <string.h>

void seperate(char both[][80],char name[][11],char number[][11],int N)//将一行字符串分为三个部分
{
	int i=0,j=0,k=0;
	while(i<N)
	{
		while(both[i][j]!=' '&&k!=10)
		{
			name[i][k]=both[i][j];
			j=j+1;
			k=k+1;
		}
		k=0;
		while(both[i][j]!=' ')
		{
			j=j+1;
		}
		j=j+1;
		while(both[i][j]!='\0'&&k!=10)
		{
			number[i][k]=both[i][j];
			j=j+1;
			k=k+1;
		}
		i=i+1;
		j=0;
		k=0;
	}
}

void sortByName(char name[][11],char num[][11],int number)
{
	int compare=2;
	int i=0,j=0,ntemp=0;
	char ctemp[11]={'\0'};
	for (j=0;j<number-1;j++)
	{
		for (i=0;i<number-1-j;i++)
		{
			compare=strcmp(name[i],name[i+1]);
            if(compare>0)
			{
				strcpy(ctemp,name[i]);
				strcpy(name[i],name[i+1]);
				strcpy(name[i+1],ctemp);
				strcpy(ctemp,num[i]);
				strcpy(num[i],num[i+1]);
				strcpy(num[i+1],ctemp);
			}
			compare=2;
		}
	}
}

int main()
{
	int N=0;
	int i=0;
	char both[52][80]={'\0'};
	char name[52][11]={'\0'};
	char number[52][11]={'\0'};
	scanf("%d",&N);
	getchar();
	while(i<N)
	{
		gets(both[i]);
		i=i+1;
	}
	seperate(both,name,number,N);
	i=0;
	sortByName(name,number,N);
	while(i<N)
	{
		printf("%12s%12s\n",name[i],number[i]);
		i=i+1;
	}
	return 0;
}


