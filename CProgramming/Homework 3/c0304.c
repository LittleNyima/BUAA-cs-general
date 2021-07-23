#include <stdio.h>
int main()
{
	int n,sum=0,i=1,j=1;
	scanf("%d",&n);
	while(1){
		while(sum<n){
			sum=sum+i;
			i=i+1;
		}
		if(sum==n){
			printf("%d=%d",n,j);
			while(j<=i-2){
				printf("+%d",j+1);
				j=j+1;
			}
			break;
		}
		else{
			j=j+1;
			i=j;
			sum=0;
		}
		if(i==n){
			printf("No Answer");
			break;
		}
	}
	return 0;
}
