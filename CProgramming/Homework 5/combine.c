#include <stdio.h>
#include <string.h>
int main()
{
	char s1[120]={'\0'};
	char s2[120]={'\0'};
	char cbn[240]={'\0'};
	int i=0;
	int j=0;
	int temp=0;
	int max=0;
	gets(s1);
	gets(s2);
	strcpy(cbn,s1);
	strcat(cbn,s2);
	max=strlen(cbn);
	for(j=0;j<max-1;j++)
	{
		for(i=0;i<max-1-j;i++)
		{
			if(cbn[i]>cbn[i+1])
			{
				temp=cbn[i];
				cbn[i]=cbn[i+1];
				cbn[i+1]=temp;
			}
		}
	}
	/*while(cbn[i+1]!='\0')
	{
		while(cbn[j+1]!='\0')
		{
			if(cbn[j]>cbn[j+1])
			{
				tmp=cbn[j];
				cbn[j]=cbn[j+1];
				cbn[j+1]=tmp;
			}
			j=j+1;
		}
		i=i+1;
		j=i;
	}*/
	printf("%s\n",cbn);
	return 0;
}
