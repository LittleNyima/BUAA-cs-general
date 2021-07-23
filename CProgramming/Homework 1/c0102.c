#include <stdio.h>
int main()
{
	int a,b,c,d;
	scanf("%d",&a);
	if ((a>0)&&(a<1000)&&(a%10!=0)){
		b=a/100;
		c=a/10-10*b;
		d=a-100*b-10*c;
		printf("%d%d%d",d,c,b);
	}
	else if ((a>0)&&(a<1000)&&(a%10==0)&&(a%100!=0)){
		b=a/100;
		c=a/10-10*b;
		printf("%d%d",c,b);
	}
	else if ((a>0)&&(a<1000)&&(a%100==0)){
		b=a/100;
		printf("%d",b);
	}
	else printf("-1");
	return 0;
}

