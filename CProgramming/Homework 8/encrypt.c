#include <stdio.h>

void clear(char word[])
{
	int i=0;
	while(word[i]!='\0')
	{
		word[i]='\0';
		i=i+1;
	}
}

int iswithin(char wordtrans[],char s)
{
	int i=0;
	while(wordtrans[i]!='\0')
	{
		if(wordtrans[i]==s)
		{
			return i;
		}
		i=i+1;
	}
	return -1;
}

void transword(char keyword[],char wordtrans[])
{
	int i=0;
	int j=0;
	int within=0;
	char s='z';
	while(keyword[i]!='\0')
	{
		within=iswithin(wordtrans,keyword[i]);
		if(within==-1)
		{
			wordtrans[j]=keyword[i];
			j=j+1;
		}
		i=i+1;
	}
	while(s>='a'&&s<='z')
	{
		within=iswithin(wordtrans,s);
		if(within==-1)
		{
			wordtrans[j]=s;
			j=j+1;
		}
		s=s-1;
	}
}

void mistrans(char word[],char wordtrans[])
{
	int i=0;
	while(word[i]!='\0')
	{
		word[i]=wordtrans[word[i]-'a'];
		i=i+1;
	}
}

int main()
{
	char line[100]={'\0'};
	char word[80]={'\0'};
	char keyword[80]={'\0'};
	char wordtrans[27]={'\0'};
	int i=0,j=0;
	FILE * IN;
	FILE * OUT;
	IN = fopen("encrypt.txt","r");
	OUT = fopen("output.txt","w");
	gets(keyword);
	transword(keyword,wordtrans);
	while(fgets(line,100,IN)!=NULL)
	{
		while(1)
		{
			if(line[i]=='\0')
			{
				break;
			}
			if(line[i]>='a'&&line[i]<='z')
			{
				clear(word);
				//seperate the single word
				while(line[i]>='a'&&line[i]<='z')
				{
					word[j]=line[i];
					j=j+1;
					i=i+1;
				}
				j=0;
				//transform and output
				mistrans(word,wordtrans);
				fprintf(OUT,"%s",word);
				i=i-1;
			}
			else
			{
				fputc(line[i],OUT);
			}
			i=i+1;
		}
		i=0;
	}
	return 0;
}

