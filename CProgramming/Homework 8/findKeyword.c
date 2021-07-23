#include <stdio.h>
#include <string.h>

void clear(char temp[])
{
	int i=0;
	while(temp[i]!='\0')
	{
		temp[i]='\0';
		i=i+1;
	}
}

int main()
{
	char line[120]={'\0'};
	char temp[10]={'\0'};
	int i=0,j=0,jtemp=0;
	int cmp=0;
	FILE * IN;
	IN = fopen("in.c","r");
	while(fgets(line,120,IN)!=NULL)
	{
		i=i+1;
		while(1)
		{
			if(line[j]=='\0')
			{
				break;
			}
			while(line[j]=='"')
			{
				j=j+1;
				if(line[j]=='"')
				{
					break;
				}
			}
			if(line[j]=='f')
			{
				clear(temp);
				temp[0]=line[j];
				temp[1]=line[j+1];
				temp[2]=line[j+2];
				cmp=strcmp(temp,"for");
				if(cmp==0)
				{
					jtemp=j+3;
					while(line[jtemp]==' '||line[jtemp]=='\t'||line[jtemp]=='\n')
					{
						jtemp=jtemp+1;
					}
					if(line[jtemp]=='('||line[jtemp]=='\0')
					{
						printf("for:%d,%d\n",i,j+1);
					}
				}
			}
			else if(line[j]=='w')
			{
				clear(temp);
				temp[0]=line[j];
				temp[1]=line[j+1];
				temp[2]=line[j+2];
				temp[3]=line[j+3];
				temp[4]=line[j+4];
				cmp=strcmp(temp,"while");
				if(cmp==0)
				{
					jtemp=j+5;
					while(line[jtemp]==' '||line[jtemp]=='\t'||line[jtemp]=='\n')
					{
						jtemp=jtemp+1;
					}
					if(line[jtemp]=='('||line[jtemp]=='\0')
					{
						printf("while:%d,%d\n",i,j+1);
					}
				}
			}
			else if(line[j]=='i')
			{
				clear(temp);
				temp[0]=line[j];
				temp[1]=line[j+1];
				cmp=strcmp(temp,"if");
				if(cmp==0)
				{
					jtemp=j+2;
					while(line[jtemp]==' '||line[jtemp]=='\t'||line[jtemp]=='\n')
					{
						jtemp=jtemp+1;
					}
					if(line[jtemp]=='('||line[jtemp]=='\0')
					{
						printf("if:%d,%d\n",i,j+1);
					}
				}
			}
			j=j+1;
		}
		j=0;
	}
	fclose(IN);
	return 0;
}
