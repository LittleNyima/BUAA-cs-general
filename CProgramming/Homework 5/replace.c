#include <stdio.h>
#include <string.h>

int lower(char character)
{
	if(character>='A'&&character<='Z')
	{
		return (character-'A'+'a');
	}
	else
		return character;
}

int stringncmp(char ed[],char row[],int i)
{
	int j=0;
	while(1)
	{
		if(row[i]=='\0'||ed[j]=='\0')
		{
			break;
		}
		if(lower(row[i])!=lower(ed[j]))
		{
			return 0;
		}
		i=i+1;
		j=j+1;
	}
	return 1;
}

void replas(char ed[],char by[],char row[],char outrow[])
{
	int i=0,j=0;
	int ncmpvalue=2;
	int edlen=strlen(ed);
	int bylen=strlen(by);
	while(1)
	{
		if(row[i]=='\0')
		{
			break;
		}
		if(lower(row[i])==lower(ed[0]))
		{
			ncmpvalue=stringncmp(ed,row,i);
			if(ncmpvalue==1)
			{
				i=i+edlen;
				j=j+bylen;
				strcat(outrow,by);
			}
			else
			{
				outrow[j]=row[i];
				j=j+1;
				i=i+1;
			}
		}
		else
		{
			outrow[j]=row[i];
			i=i+1;
			j=j+1;
		}
	}
}

void clear(char s[])
{
	int i=0;
	while(i<300)
	{
		s[i]='\0';
		i=i+1;
	}
}

int main()
{
	char ed[100]={'\0'};
	char by[100]={'\0'};
	char row[300]={'\0'};
	char outrow[300]={'\0'};
	FILE * in;
	FILE * out;
	
	gets(ed);
	gets(by);
	in=fopen("filein.txt","r");
	out=fopen("fileout.txt","w");
	if(in==NULL)
		return -1;
	if(out==NULL)
	{
		fclose(in);
		return -1;
	}

	while(fgets(row,300,in)!=NULL)
	{
		replas(ed,by,row,outrow);
		fputs(outrow,out);
		clear(row);
		clear(outrow);
	}

	fclose(in);
	fclose(out);
	return 0;
}
