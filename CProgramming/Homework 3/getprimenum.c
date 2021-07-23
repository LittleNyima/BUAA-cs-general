#include <stdio.h>
#include <math.h>

int isprime(int m)
{
	int i;
	for(i=2;i<m;i++){
		if(m%i==0)
			return 0;
		else
			return 1;
	}
	return 0;
}

int main()
{
	int n=0,m=0,i=1,j=0,p,q,po=10,nn;
	scanf("%d",&nn);
	n=nn;
	while(nn%po!=nn){
		i=i+1;
		po=pow(10,i);
	}
	while(i!=0){
		j=n%10;
		m=m+j*pow(10,i-1);
		i=i-1;
		n=n/10;
	}
	p=isprime(m);
	q=isprime(nn);
	if((p==1)&&(q==1)){
		printf("yes");
	}
	else{
		printf("no");
	}
	return 0;
}
