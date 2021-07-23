#include <stdio.h>
int main()
{
	char ch;
	FILE * in;
	FILE * out;
	in=fopen("fcopy.in","r");
	out=fopen("fcopy.out","w");
	if(in==NULL)
	{
		return -1;
	}
	if(out==NULL)
	{
		fclose(in);
		return -1;
	}
	while((ch=fgetc(in))!=EOF)
	{
		if((ch==' ')||(ch=='\t'))
		{
			fputc(' ',out);
			ch=fgetc(in);
			while((ch==' ')||(ch=='\t'))
			{
				ch=fgetc(in);
			}
		}
		fputc(ch,out);
	}
	fclose(out);
	fclose(in);
	return 0;
}
