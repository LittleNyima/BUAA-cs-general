#include <stdio.h>
#include <string.h>
#include <math.h>

int calnumber(int argc,char** argv)
{
	int len=0;
	int i=1;
	int number=0;
	if(argc==2)
		return 10;
	else if(argc==3)
	{
		len=strlen(argv[1])-2;
		while(len>=0)
		{
			number=number+(argv[1][i]-'0')*(int)pow(10,len);
			len=len-1;
			i=i+1;
		}
	}
	return number;
}

int main(int argc,char** argv)
{
	//char command[100]={'\0'};
	char filename[100]={'\0'};
	char lines[80][120]={'\0'};
	int number=0;
	int nline=0;
	int i=0,j=0;
	FILE * IN;
	if(argc==2)
		strcpy(filename,argv[1]);
	else if(argc==3)
		strcpy(filename,argv[2]);
	number=calnumber(argc,argv);
	//scanf("%s",&command);
	//scanf("%d",&number);
	//scanf("%s",&filename);
	IN = fopen(filename,"r");
	/*if(number==0)
	{
		number=10;
	}
	else
	{
		number=-number;
	}*/
	while(fgets(lines[nline],120,IN)!=NULL)
	{
		nline=nline+1;
	}
	while(i<nline)
	{
		while(lines[i][j]!='\0')
		{
			if(lines[i][j]=='\n')
			{
				lines[i][j]='\0';
			}
			j=j+1;
		}
		j=0;
		i=i+1;
	}
	i=0;
	/*j=nline-1;
	while(i<number)
	{
		printf("%s\n",lines[j]);
		j=j-1;
		i=i+1;
	}*/
	j=nline-number;
	while(j<nline)
	{
		printf("%s\n",lines[j]);
		j=j+1;
	}
	fclose(IN);
	return 0;
}

