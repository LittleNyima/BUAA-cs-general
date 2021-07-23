#include <stdio.h>
#include <math.h>
int main()
{
	int a,b,c;
	double d,e,s;
	scanf("%d %d %d",&a,&b,&c);
	d=(a+b+c)/2;
	e=d*(d-a)*(d-b)*(d-c);
	s=sqrt(e);
	printf("%10.3f",s);
	return 0;
}
