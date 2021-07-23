#include <stdio.h>
int main()
{
	int a,b=11,c=11;
	scanf ("%d",&a);
	c=10*(b%10)+(b/10);
	while ((b<100)&&(a!=b*c)){
		b=b+1;
		c=10*(b%10)+(b/10);
	}
	if (b==100) {printf("No Answer");}
	else printf("%d",b);
	return 0;
}

