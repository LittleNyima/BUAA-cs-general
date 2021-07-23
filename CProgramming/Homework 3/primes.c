#include <stdio.h>
int main()
{
	int n=0,m=2;
	scanf("%d",&n);
	while(1){
		while(n%m==0){
			printf("%d ",m);
			n=n/m;
			break;
		}
		while(n%m!=0){
			m=m+1;
			break;
		}
		if(n==m){
			break;
		}
	}
	printf("%d",m);
	return 0;
}
