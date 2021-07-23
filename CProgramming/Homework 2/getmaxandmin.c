#include <stdio.h>
int main()
{
	int n=0,i=0,p=0,q=0;
	int a[100];
	int max,min;
	scanf ("%d",&n);
	while (i<n){
		scanf ("%d",&a[i]);
		i=i+1;
	}
	max=a[0];
	min=a[0];
	while (p<n){
		if (max<=a[p]){
			max=a[p];
		}
		else{
			max=max;
		}
		p=p+1;
	}
	while (q<n){
		if (min>=a[q]){
			min=a[q];
		}
		else{
			min=min;
		}
		q=q+1;
	}
	printf ("%d %d",max,min);
	return 0;
}

