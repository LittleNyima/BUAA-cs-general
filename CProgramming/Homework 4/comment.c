#include <stdio.h>
int main()
{
	char ch;
	int n=0,m=0;
	double rate;
	int real;
	FILE * source;
	FILE * source1;
	source=fopen("filein.c","r");
	if(source==NULL)
	{
		return -1;
	}
	ch=fgetc(source);
	while(ch!=EOF)
	{
		if(ch=='/')
		{
			ch=fgetc(source);
			if(ch=='*')
			{
				while(1)
				{
					ch=fgetc(source);
					if(ch=='*')
					{
						ch=fgetc(source);
						if(ch=='/')
						{
							break;
						}
						else
						{
							n=n+1;
						}
					}
					n=n+1;
				}
			}
		}
		ch=fgetc(source);
	}
	fclose(source);
	source1=fopen("filein.c","r");
	if(source1==NULL)
	{
		return -1;
	}
	ch='\0';
	while(ch!=EOF)
	{
		ch=fgetc(source1);
		m=m+1;
	}
	fclose(source1);
	m=m-1;
	rate=(double)n/(double)m;
	rate=rate*1000;
	real=(int)rate;
	real=real/10;
	printf("%d%%\n",real);
	return 0;
}
