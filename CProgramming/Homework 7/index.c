#include <stdio.h>
#include <string.h>

#define LEGAL (line[col]!=' '&&line[col]!='.'&&line[col]!=','&&line[col]!='!'&&line[col]!='?'&&line[col]!=':'&&line[col]!=';'&&line[col]!='\n'&&line[col]!='\0')
#define WORDLEGAL ((word[i]>='A'&&word[i]<='Z')||(word[i]>='a'&&word[i]<='z')||word[i]=='-')
#define NOSTAS ((strcmp(word,"a")==0||strcmp(word,"an")==0||strcmp(word,"the")==0||strcmp(word,"and")==0))

int islegal(char word[])
{
	int i=0;
	if(word[0]=='\0')
		return 0;
	if(NOSTAS)
	{
		return 0;
	}
	while(word[i]!='\0')
	{
		if(!WORDLEGAL)
		{
			return 0;
		}
		i=i+1;
	}
	return 1;
}

int iswithin(char word[],char words[][110])
{
	int i=0;
	while(words[i][0]!='\0')
	{
		if(strcmp(word,words[i])==0)
		{
			return i;
		}
		i=i+1;
	}
	return -1;
}

int unoccupied(int position[][200][2],int nwithin)
{
	int i=0;
	while(1)
	{
		if(position[nwithin][i][0]==0&&position[nwithin][i][1]==0)
			break;
		i=i+1;
	}
	return i;
}

void clear(char toclear[])
{
	int i=0;
	while(toclear[i]!='\0')
	{
		toclear[i]='\0';
		i=i+1;
	}
}

void sortwords(char words[][110],int position[][200][2])
{
	int i=0,j=0,n=0;
	int ntemp=0;
	char temp[110]={'\0'};
	while(words[i][0]!='\0')
	{
		while(words[j+1][0]!='\0')
		{
			if(strcmp(words[j],words[j+1])>0)
			{
				strcpy(temp,words[j]);
				strcpy(words[j],words[j+1]);
				strcpy(words[j+1],temp);
				while(n<200)
				{
					ntemp=position[j][n][0];
					position[j][n][0]=position[j+1][n][0];
					position[j+1][n][0]=ntemp;
					ntemp=position[j][n][1];
					position[j][n][1]=position[j+1][n][1];
					position[j+1][n][1]=ntemp;
					n=n+1;
				}
				n=0;
			}
			j=j+1;
		}
		j=0;
		i=i+1;
	}
}

void print(char words[][110],int position[][200][2],FILE * OUT)
{
	int i=0,j=0;
	while(words[i][0]!='\0')
	{
		if(strcmp(words[i],"-")==0)
		{
			i=i+1;
			continue;
		}
		fprintf(OUT,"%s",words[i]);
		fprintf(OUT,":");
		fprintf(OUT,"(%d,%d)",position[i][j][0],position[i][j][1]);
		j=j+1;
		while(position[i][j][0]!=0)
		{
			fprintf(OUT,",(%d,%d)",position[i][j][0],position[i][j][1]);
			j=j+1;
		}
		fprintf(OUT,"\n");
		i=i+1;
		j=0;
	}
}

int main()
{
	char line[3000]={'\0'};
	char word[120]={'\0'};
	char words[50][110]={'\0'};
	int position[50][200][2]={0};
	int blank[200]={0};
	int row=0,col=0,col1st=0;
	int i=0,nlegal=0,nwithin=0;
	int nwords=0,wh=1;
	int occupy=0;
	FILE * IN;
	FILE * OUT;
	IN=fopen("crossin.txt","r");
	while(fgets(line,3000,IN)!=NULL)
	{
		row=row+1;
		col=0;
		while(line[col]!='\0')
		{
			while(LEGAL)
			{
				if(wh==1)
				{
					col1st=col;
					wh=2;
				}
				word[i]=line[col];
				i=i+1;
				col=col+1;
			}
			wh=1;
			nlegal=islegal(word);
			if(nlegal==1)
			{
				nwithin=iswithin(word,words);
				if(nwithin==-1)
				{
					strcpy(words[nwords],word);
					nwords=nwords+1;
					nwithin=iswithin(word,words);
					occupy=unoccupied(position,nwithin);
					position[nwithin][occupy][0]=row;
					position[nwithin][occupy][1]=col1st+1;
				}
				else
				{
					occupy=unoccupied(position,nwithin);
					position[nwithin][occupy][0]=row;
					position[nwithin][occupy][1]=col1st+1;
				}
			}
			clear(word);
			col=col+1;
			i=0;
		}
	}
	sortwords(words,position);
	fclose(IN);
	OUT=fopen("crossout.txt","w");
	print(words,position,OUT);
	fclose(OUT);
	return 0;
}


