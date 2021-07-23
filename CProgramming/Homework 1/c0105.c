#include <stdio.h>
int main()
{
	int a,b,c,d,e;
	scanf("%d",&a);
	b=a/10;
	c=(a-b*10)/5;
	d=(a-b*10-c*5)/2;
	e=a-b*10-c*5-d*2;
	printf("%d %d %d %d",b,c,d,e);
	return 0;
}
