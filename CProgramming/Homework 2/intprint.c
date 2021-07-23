#include <stdio.h>
#include <string.h>
int main()
{
	char a[100];
	int c,d;
	scanf("%s",&a);
	c=strlen(a);
	d=c-1;
	printf("%d\n%s\n",c,a);
	while (d>=0)
	{
		printf("%c",a[d]);
		d=d-1;
	}
	return 0;
}

