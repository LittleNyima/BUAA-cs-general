#include <stdio.h>
#include <math.h>
int main()
{
	int m=0,n=0;
	double a=0,b=0;
	int p=1;
	scanf ("%d %d",&n,&m);
	a=n;
	while (p<=m-1){
		a=a+2*n*pow(0.25,p);
		p=p+1;
	}
	b=n*pow(0.25,p);
	printf("%.2f\n%.2f",a,b);
	return 0;
}
