#include <stdio.h>
#include <string.h>
int main()
{
	char origin[1000]={'\0'};
	char del[1000]={'\0'};
	char outp[1000]={'\0'};
	char temp[1000]={'\0'};
	int i=0,j=0,k=0,s=0;
	int judge=99;
	gets(origin);
	gets(del);
	while(origin[i]!='\0')
	{
		if(origin[i]==del[j])
		{
			temp[k]=origin[i];
			i=i+1;
			j=j+1;
			k=k+1;
			judge=1;
			while(del[j]!='\0')
			{
				if(origin[i]==del[j])
				{
					temp[k]=origin[i];
					i=i+1;
					j=j+1;
					k=k+1;
				}
				else
				{

					strcat(outp,temp);
					break;
				}
				
			}
			j=0;
			k=0;
			while(temp[k]!='\0')
			{
				temp[k]='\0';
				k=k+1;
			}
			k=0;
		}
		else
		{
			s=strlen(outp);
			outp[s]=origin[i];
		}
		if(judge==99)
		{
			i=i+1;
		}
		judge=99;
	}
	printf("%s\n",outp);
	return 0;
}

