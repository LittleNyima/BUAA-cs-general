#include <stdio.h>
int main()
{
	int a[100];
	int b[100];
	int m,i=0,p=0,q=0,j=0;
	scanf("%d",&m);
	while(m>=0){
		a[i]=m;
		i=i+1;
		scanf("%d",&m);
	}
	scanf("%d",&m);
	while(m>=0){
		b[j]=m;
		j=j+1;
		scanf("%d",&m);
	}
	while(p<=i){
		while(q<=j){
			if(a[p]==b[q])
				break;
			else
				q=q+1;
		}
		if(q==j+1){
			printf("%d ",a[p]);
		}
		q=0;
		p=p+1;
	}
	return 0;
}

