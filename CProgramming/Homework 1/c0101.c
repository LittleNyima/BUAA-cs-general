#include <stdio.h>
int		main()
{
	int a,b,c,sum;
	float ave;
	scanf("%d%d%d",&a,&b,&c);
	sum=a+b+c;
	ave=(float)sum/3;
	printf("%d\n",sum);
	printf("%4.2f",ave);
	return 0;
}


