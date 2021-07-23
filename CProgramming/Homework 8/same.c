#include <stdio.h>
#include <string.h>

int iswithin(char word[],char variables[][50])
{
	int i=0;
	while(variables[i][0]!='\0')
	{
		if(strcmp(word,variables[i])==0)
			return 1;
		i=i+1;
	}
	return 0;
}

int main()
{
	char words[500][50]={'\0'};
	char variables[100][50]={'\0'};
	int i=0;
	int j=0;
	FILE * IN;
	FILE * OUT;
	IN = fopen("input.c","r");
	OUT = fopen("output.c","w");
	while(fscanf(IN,"%s",words[i])!=EOF)
	{
		i=i+1;
	}
	i=0;
	while(words[i][0]!='\0')
	{
		if(strcmp(words[i],"int")==0)
		{
			i=i+1;
			while(strcmp(words[i],";")!=0)
			{
				if(strcmp(words[i],",")!=0)
				{
					strcpy(variables[j],words[i]);
					j=j+1;
				}
				i=i+1;
			}
		}
		i=i+1;
	}
	i=0;
	while(words[i][0]!='\0')
	{
		if(iswithin(words[i],variables)==0)
			fprintf(OUT,"%s",words[i]);
		i=i+1;
	}
	fclose(IN);
	fclose(OUT);
	return 0;
}

