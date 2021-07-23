#include <stdio.h>
int main()
{
	int n=2;
	double PI=3.14,e=0,up=1.0,down=3.0;
	double halfPI=(1.0+1.0/3.0);
	double supportPI=(1.0);
	scanf("%lf",&e);
	while((halfPI-supportPI)>=(e/2)){
		supportPI=halfPI;
		n=n+1;
		up=up*(n-1);
		down=down*(2*n-1);
		halfPI=halfPI+up/down;
	}
	PI=2*halfPI;
	printf("%d %.7f",n,PI);
	return 0;
}
