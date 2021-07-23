#include <stdio.h>
#include <string.h>

void trans(char s[],char output[][100],int i)
{
	int j=i;
	int n=0;
	while(s[j]!='\0')
	{
		output[i][n]=s[j];
		j=j+1;
		n=n+1;
	}
	j=0;
	while(j<i)
	{
		output[i][n]=s[j];
		n=n+1;
		j=j+1;
	}
}

void sortlist(char output[][100])
{
	char temp[100]={'\0'};
	int i=0;
	int j=0;
	while(output[i][0]!='\0')
	{
		while(output[j+1][0]!='\0')
		{
			if(output[j][0]>output[j+1][0])
			{
				strcpy(temp,output[j]);
				strcpy(output[j],output[j+1]);
				strcpy(output[j+1],temp);
			}
			j=j+1;
		}
		i=i+1;
		j=0;
	}
}

int position(char where[],char output[][100])
{
	int i=0;
	while(output[i][0]!='\0')
	{
		if(strcmp(where,output[i])==0)
			return i;
		i=i+1;
	}
	return -1;
}

int main()
{
	int length=0;
	int i=0;
	int posit=0;
	char s[100]={'\0'};
	char outcopy[100]={'\0'};
	char output[100][100]={'\0'};
	FILE * IN;
	FILE * OUT;
	IN = fopen("filezip.in","r");
	fscanf(IN,"%d",&length);
	fscanf(IN,"%s",&s);
	fclose(IN);
	while(i<length)
	{
		trans(s,output,i);
		i=i+1;
	}
	strcpy(outcopy,output[1]);
	i=0;
	sortlist(output);
	posit=position(outcopy,output);
	OUT = fopen("filezip.out","w");
	while(i<length)
	{
		fprintf(OUT,"%c",output[i][length-1]);
		i=i+1;
	}
	fprintf(OUT,"\n");
	fprintf(OUT,"%d",posit+1);
	fclose(OUT);
	return 0;
}
